import { NextApiRequest, NextApiResponse } from 'next';
import { addProduct } from '../../util/database';
const cheerio = require('cheerio');

export type AddContractResponseBody =
  | { errors: string }
  | { message: string | undefined };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddContractResponseBody>,
) {
  if (req.method === 'POST') {
    const dealsCategory = [
      { category: 'wohnzimmer', dbNumber: 1 },
      { category: 'schlafzimmer', dbNumber: 2 },
      { category: 'speisezimmer', dbNumber: 3 },
      { category: 'dekoration', dbNumber: 4 },
      { category: 'arbeitszimmer', dbNumber: 5 },
      { category: 'badezimmer', dbNumber: 6 },
      { category: 'garderobe', dbNumber: 7 },
      { category: 'kinderzimmer', dbNumber: 8 },
    ];
    const baseUrl = 'https://www.moemax.at';
    const headers = {
      Cookie:
        '__cf_bm=kGvHo.NF0o5iXhgmNUblBEkrw7h_0ZCNqIigXJ1eYKc-1650104946-0-AbQ1xwkvZvzwLUxp2lHd9OZJGSBxiKMVGiBXluzAaa5ZYbMHjciAH4tvhyzKFT4V8FwU12D53+Yx3TKUN0n69A8=',
      'user-agent': 'PostmanRuntime/7.29.0',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    };

    for (let j = 0; j < dealsCategory.length; j++) {
      const response = await fetch(
        `https://www.moemax.at/c/${dealsCategory[j].category}-sale`,
        {
          headers,
        },
      );

      const htmlString = await response.text();
      const indexPosition = htmlString.indexOf('window.__');
      const newString = htmlString.slice(0, indexPosition);

      // load string into cheerio
      const $ = cheerio.load(newString);

      // get current deals
      const checkCurrentDeals = $('[data-purpose="listing.productsContainer"]');

      // get current deals data
      if (checkCurrentDeals.html() !== 'null') {
        $('[data-purpose="listing.productsContainer"] article').each(
          async (i, el) => {
            const productMoemaxName = $(el).find('h3').text().replace(/,/g, '');

            const productMoemaxUrl = $(el).find('a').attr('href');
            const productMoemaxOldPrice = $(el)
              .find('[data-purpose="product.price.old"]')
              .text()
              .replace(/["€*]/g, '')
              .replace(',', '.')
              .replace('/\\-/', '00')
              .trim();

            const productMoemaxCurrentPrice = $(el)
              .find('[data-purpose="product.price.current"]')
              .text()
              .replace(/["€*]/g, '')
              .replace(',', '.')
              .trim();

            const productMoemaxSaving = $(el).find('._ggQHMv9W6taNwaY2').text();

            console.log(productMoemaxOldPrice);
            console.log(productMoemaxOldPrice.length);

            const fullProductMoemaxUrl = baseUrl + productMoemaxUrl;
            const productCategory = dealsCategory[j].dbNumber;

            // add product to db
            const addProductToDB = await addProduct(
              productMoemaxName,
              fullProductMoemaxUrl,
              productMoemaxOldPrice,
              productMoemaxCurrentPrice,
              productMoemaxSaving,
              productCategory,
            );
            console.log(addProductToDB);
          },
        );
      } // end if
    }
    res.status(200).json({
      message: 'new deals in db',
    });
    return;
  }
  return res.status(405).json({
    errors: `Method not supported.`,
  });
}
