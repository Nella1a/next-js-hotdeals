import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';
import { ProductDetails } from '../../../c/[slug]/page';

type Params = {
  params: { id: string };
};

export const getCategoryDeals = async (category: number) => {
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

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
  }

  const deals = await getCategoryDeals(Number(id));
  return NextResponse.json(deals);
}
