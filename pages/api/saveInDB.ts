import { NextApiRequest, NextApiResponse } from 'next';
import {
  addProduct,
  deleteProduct,
  Products,
  readProducts,
} from '../../util/database';

export type GetDealsReponseBody =
  | { errors: string }
  | { deals: Products[]; message: string }
  | { dealId: number };

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
    req.body.hotdeals.forEach(async (deal: any) => {
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

  if (req.method === 'DELETE') {
    console.log('Hello');
    console.log('deals_id:', req.body.dealId);

    if (typeof req.body.dealId === 'number' || !req.body.dealId) {
      res.status(405).json({
        errors: 'No valid deal id',
      });

      const deletedDeals = await deleteProduct(req.body.dealId);
      res.status(200).json({
        dealId: deletedDeals,
      });
    }
  }
  return res.status(405).json({
    errors: `Method not supported.`,
  });
}
