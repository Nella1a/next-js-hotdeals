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
    console.log('Hello');
    console.log('deals_id:', req.body.dealId);

    if (typeof req.body.dealId !== 'number' || !req.body.dealId) {
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
