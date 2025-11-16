import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global prisma in development to prevent multiple instances during hot reloads
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

const prisma = global.__prismaClient ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.__prismaClient = prisma;

export default prisma;
