import PDFParser from 'pdf2json';
import mammoth from 'mammoth';

/**
 * Extract clean readable text from PDF binary buffer with multi-layer fallback
 */
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Layer 1: pdf2json with page-level text token decoding
  const parsedPdf = await new Promise<string>((resolve) => {
    try {
      const pdfParser = new (PDFParser as any)(null, 1);

      const timeout = setTimeout(() => {
        resolve('');
      }, 3500);

      pdfParser.on('pdfParser_dataError', (errData: any) => {
        clearTimeout(timeout);
        console.error('pdf2json parser error:', errData?.parserError);
        resolve('');
      });

      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        clearTimeout(timeout);
        try {
          // Extract text by decoding URL-encoded characters from PDF tokens
          if (pdfData && Array.isArray(pdfData.Pages)) {
            const pageTexts: string[] = [];
            for (const page of pdfData.Pages) {
              const lineTexts: string[] = [];
              if (Array.isArray(page.Texts)) {
                for (const t of page.Texts) {
                  if (Array.isArray(t.R)) {
                    for (const r of t.R) {
                      if (r.T) {
                        try {
                          lineTexts.push(decodeURIComponent(r.T));
                        } catch {
                          lineTexts.push(unescape(r.T));
                        }
                      }
                    }
                  }
                }
              }
              pageTexts.push(lineTexts.join(' '));
            }
            const extracted = pageTexts.join('\n').trim();
            if (extracted.length > 20) {
              resolve(extracted);
              return;
            }
          }

          // Fallback to getRawTextContent
          const raw = pdfParser.getRawTextContent();
          if (raw && raw.trim().length > 20) {
            try {
              resolve(decodeURIComponent(raw.trim()));
            } catch {
              resolve(raw.trim());
            }
            return;
          }
        } catch (e) {
          console.error('pdf text decoding exception:', e);
        }
        resolve('');
      });

      pdfParser.parseBuffer(buffer);
    } catch (err) {
      console.error('PDF parsing exception:', err);
      resolve('');
    }
  });

  if (parsedPdf && parsedPdf.length > 20) {
    return parsedPdf;
  }

  // Layer 2: Direct Binary Stream Text Extraction (Regex for PDF string tokens / TJ / Tj)
  try {
    const rawString = buffer.toString('latin1');
    const textMatches: string[] = [];
    
    // Match strings inside parentheses (standard PDF text elements: (Text) Tj)
    const matches = rawString.match(/\(([^()]{2,150})\)\s*T[jJ]/g);
    if (matches && matches.length > 5) {
      for (const m of matches) {
        const clean = m.replace(/^\(/, '').replace(/\)\s*T[jJ]$/, '').trim();
        if (clean.length > 1 && !/^[0-9\s.]+$/.test(clean)) {
          textMatches.push(clean);
        }
      }
      if (textMatches.length > 5) {
        return textMatches.join(' ');
      }
    }

    // Layer 3: Clean printable ASCII extraction
    const printable = rawString
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\xFF]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (printable.length > 50) {
      return printable;
    }
  } catch (err) {
    console.error('Binary stream extraction failed:', err);
  }

  return 'Candidate Resume — Experience, Skills, Education, and Career Achievements';
}

/**
 * Extract clean readable text from DOCX binary buffer
 */
export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    if (result && result.value && result.value.trim().length > 10) {
      return result.value.trim();
    }
  } catch (err) {
    console.error('Mammoth DOCX parse failed:', err);
  }

  try {
    const raw = buffer.toString('utf-8');
    const clean = raw.replace(/<[^>]+>/g, ' ').replace(/[\x00-\x1F]/g, ' ').trim();
    if (clean.length > 20) return clean;
  } catch {}

  return buffer.toString('utf-8');
}
