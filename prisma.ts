import { PrismaClient } from '@prisma/client';

/*
instance PrismaClient and save it on the globalThis object. Then we keep a check to only instantiate PrismaClient if it's not on the globalThis object otherwise use the same instance again if already present to prevent instantiating extra PrismaClient instances.
*/
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

let prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// mock switching for testing
if (process.env.USE_MOCK_PRISMA === 'true') {

  prisma = require('./prisma/__mocks__/prisma').default;
} else {

  const { PrismaClient } = require('@prisma/client');
  prisma = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
}
export default prisma;

//if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
