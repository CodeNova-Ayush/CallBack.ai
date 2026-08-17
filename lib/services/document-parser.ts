import PDFParser from 'pdf2json';
import mammoth from 'mammoth';

/**
 * Extract clean readable text from PDF binary buffer using pdf2json
 */
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve) => {
    try {
      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on('pdfParser_dataError', (errData: any) => {
        console.error('pdf2json error:', errData?.parserError);
        // Fallback to ASCII string
        const fallback = buffer.toString('latin1').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\xFF]/g, ' ');
        resolve(fallback);
      });

      pdfParser.on('pdfParser_dataReady', () => {
        try {
          const rawText = pdfParser.getRawTextContent();
          if (rawText && rawText.trim().length > 10) {
            resolve(rawText.trim());
            return;
          }
        } catch (e) {
          console.error('getRawTextContent error:', e);
        }
        resolve(buffer.toString('utf-8'));
      });

      pdfParser.parseBuffer(buffer);
    } catch (err) {
      console.error('PDF parsing exception:', err);
      resolve(buffer.toString('utf-8'));
    }
  });
}

/**
 * Extract clean readable text from DOCX binary buffer
 */
export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    if (result && result.value) {
      return result.value.trim();
    }
  } catch (err) {
    console.error('Mammoth DOCX parse failed:', err);
  }
  return buffer.toString('utf-8');
}
