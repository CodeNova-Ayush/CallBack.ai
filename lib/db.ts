import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function createPrismaClient(): PrismaClient {
  try {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      const tmpDbPath = path.join('/tmp', 'dev.db');
      if (!fs.existsSync(tmpDbPath)) {
        const potentialPaths = [
          path.join(/*turbopackIgnore: true*/ process.cwd(), 'dev.db'),
          path.join(/*turbopackIgnore: true*/ process.cwd(), 'prisma', 'dev.db'),
        ];
        for (const p of potentialPaths) {
          if (fs.existsSync(p)) {
            try {
              fs.copyFileSync(p, tmpDbPath);
              break;
            } catch (err) {
              console.error('Error copying sqlite db to /tmp:', err);
            }
          }
        }
      }
      return new PrismaClient({
        datasources: {
          db: {
            url: `file:${tmpDbPath}`,
          },
        },
        log: ['error'],
      });
    }
  } catch (e) {
    console.error('Failed to setup Vercel db path:', e);
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

