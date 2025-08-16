import {
  mockCategories,
  mockDeals,
  mockShops,
} from '../../src/mocks/fixturesDeals';

const prisma = {
  categories: {
    findMany: async () => mockCategories,
  },
  shops: {
    findMany: async () => mockShops,
  },
  hproducts: { findMany: async () => mockDeals },
};

export default prisma;
