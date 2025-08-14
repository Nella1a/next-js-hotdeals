import { deals } from '../../src/mocks/fixturesDeals';

const prisma = {
  categories: {
    findMany: async () => [
      { id: 1, name: 'mock-category-1' },
      { id: 2, name: 'mock-category-2' },
      { id: 3, name: 'mock-category-3' },
    ],
  },
  shops: {
    findMany: async () => [
      { id: 1, name: 'mock-shop-1' },
      { id: 2, name: 'mock-shop-2' },
    ],
  },
  hproducts: { findMany: async () => deals },
};

export default prisma;
