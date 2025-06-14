import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET() {
  const deals = await prisma.hproducts.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
  });

  return NextResponse.json(deals);
}
