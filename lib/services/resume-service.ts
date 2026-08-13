import { db } from '@/lib/db';

export async function getResumeWithSections(resumeId: string) {
  try {
    const resume = await db.resume.findUnique({
      where: { id: resumeId },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
        analysisResults: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        verificationClaims: true,
      },
    });

    if (!resume) {
      // Fallback to first available resume or seed
      const firstResume = await db.resume.findFirst({
        include: {
          sections: { orderBy: { order: 'asc' } },
          analysisResults: { orderBy: { createdAt: 'desc' }, take: 1 },
          verificationClaims: true,
        },
      });
      return firstResume;
    }

    return resume;
  } catch (error) {
    console.error('Failed to get resume:', error);
    return null;
  }
}

export async function getUserResumes(userId: string) {
  try {
    return await db.resume.findMany({
      where: { userId },
      include: {
        sections: { orderBy: { order: 'asc' } },
        analysisResults: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to list resumes:', error);
    return [];
  }
}

export async function updateResumeSection(sectionId: string, content: any) {
  try {
    return await db.resumeSection.update({
      where: { id: sectionId },
      data: {
        content: typeof content === 'string' ? content : JSON.stringify(content),
      },
    });
  } catch (error) {
    console.error('Failed to update resume section:', error);
    throw error;
  }
}

export async function createResumeSection(resumeId: string, sectionType: string, order: number, content: any) {
  try {
    return await db.resumeSection.create({
      data: {
        resumeId,
        sectionType,
        order,
        content: typeof content === 'string' ? content : JSON.stringify(content),
      },
    });
  } catch (error) {
    console.error('Failed to create section:', error);
    throw error;
  }
}

export async function reorderSections(sectionOrders: { id: string; order: number }[]) {
  try {
    const updates = sectionOrders.map((item) =>
      db.resumeSection.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );
    return await db.$transaction(updates);
  } catch (error) {
    console.error('Failed to reorder sections:', error);
    throw error;
  }
}
