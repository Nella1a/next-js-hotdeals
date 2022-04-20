import { NextApiRequest, NextApiResponse } from 'next';
import { addProduct, Products, readProducts } from '../../util/database';

// type Products = {
//   name: string;
//   nameAndInfo: string;
//   productUrl: string;
//   oldPrice: string;
//   currentPrice: string;
//   savings: string;
//   category: number;
// };

export type GetDealsReponseBody =
  | { errors: string }
  | { deals: Products[]; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetDealsReponseBody>,
) {
  if (req.method === 'POST') {
    console.log('request body:', req.body.hotdeals);
    // check if deals object is empty
    if (req.body.hotdeals.length === 0) {
      return res.status(405).json({
        errors: `No deals provided`,
      });
    }

    // save deals in DB
    req.body.hotdeals.forEach(async (deal) => {
      await addProduct(
        deal.name,
        deal.url,
        deal.priceCurrent,
        deal.priceOld,
        deal.discount,
        deal.category,
      );
    });

    const dealsInDB = await readProducts();
    console.log('deals response DB', dealsInDB);
    res.status(200).json({
      deals: dealsInDB,
      message: `${req.body.hotdeals.length} Products successfully added to DB`,
    });
    return;
  }

  return res.status(405).json({
    errors: `Method not supported.`,
  });
}
