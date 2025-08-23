import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET() {
  const searchResult = await prisma.hproducts.findMany({
    where: {
      title: {
        search: 'sofa',
      },
    },
  });

  return NextResponse.json(searchResult);
}
