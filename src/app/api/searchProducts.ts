import prisma from '../../../prisma';
import { ProductDetails } from '../c/[slug]/page';

export const searchProducts = async (query: string) => {
  const searchTerms = query.split(' ');

  let searchResult = [] as ProductDetails[];

  if (searchTerms.length > 0) {
    const orResultMatch = await prisma.hproducts.findMany({
      where: {
        AND: [
          {
            OR: searchTerms.map((term) => ({
              title: {
                contains: term,
                mode: 'insensitive',
              },
            })),
          },
          {
            discount: {
              gt: 0,
            },
          },
        ],
      },
    });

    const andResultMatch = await prisma.hproducts.findMany({
      where: {
        AND: [
          {
            AND: searchTerms.map((term) => ({
              title: {
                contains: term,
                mode: 'insensitive',
              },
            })),
          },
          {
            discount: {
              gt: 0,
            },
          },
        ],
      },
    });
    searchResult = [...andResultMatch, ...orResultMatch];
  }

  return searchResult;
};
