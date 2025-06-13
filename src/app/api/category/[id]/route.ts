import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { ProductDetails } from '../../../c/[slug]/page';

type Params = {
  params: { id: string };
};

const getDeals = async (category: number) => {
  if (category) {
    const cat = await prisma.hproducts.findMany({
      where: {
        category_id: category,
        discount: {
          gt: 0,
        },
      },
    });
    return cat;
  }
  return [] as ProductDetails[];
};

export async function GET({ params }: Params) {
  const catId = Number(params.id);
  if (isNaN(catId)) {
    return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
  }

  const deals = await getDeals(Number(catId));
  return NextResponse.json(deals);
}
