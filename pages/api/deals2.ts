import { NextApiRequest, NextApiResponse } from 'next';
import { addProduct } from '../../util/database';
const cheerio = require('cheerio');

type Products = {
  name: string;
  nameAndInfo: string;
  productUrl: string;
  oldPrice: string;
  currentPrice: string;
  savings: string;
  category: number;
};

export type AddContractResponseBody =
  | { errors: string }
  | { deals: Products[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddContractResponseBody>,
) {
  if (req.method === 'POST') {
    const productsArray = [
      {
        name: '',
        nameAndInfo: '',
        productUrl: '',
        oldPrice: '',
        currentPrice: '',
        savings: '',
        category: 0,
      },
    ];

    const dealsCategory = [
      { category: 'wohnzimmer', dbNumber: 1 },
      // { category: 'schlafzimmer', dbNumber: 2 },
      // { category: 'speisezimmer', dbNumber: 3 },
      // { category: 'dekoration', dbNumber: 4 },
      // { category: 'arbeitszimmer', dbNumber: 5 },
      // { category: 'badezimmer', dbNumber: 6 },
      // { category: 'garderobe', dbNumber: 7 },
      // { category: 'kinderzimmer', dbNumber: 8 },
    ];
    console.log('number;', req.body.hotdeals);
    const baseUrl = `https://www.moebelix.at/`;
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
        `https://www.moebelix.at/${dealsCategory[j].category}-C1?v_eyecatcher=sale`,
        {
          headers,
        },
      );

      const htmlString = await response.text();
      const indexPosition = htmlString.indexOf('window.__');
      const newString = htmlString.slice(0, indexPosition);

      // load string into cheerio: create pseudo-DOM of website
      const $ = cheerio.load(newString);

      // get deals-container in html
      const checkCurrentDeals = $('[data-purpose="listing.productsContainer"]');
      // console.log($.html());

      // If deals-container exists loop trough each deal and get data
      if (checkCurrentDeals.html() !== 'null') {
        $('[data-purpose="listing.productsContainer"] article').each(
          (i, el) => {
            const productName = $(el).find('h3 > span').text();
            const productNameAndInfo = $(el).find('h3').text();
            const productUrl = $(el).find('a').attr('href');
            const productOldPrice = $(el)
              .find('[data-purpose="product.price.old"]')
              .text()
              .replace(/["€*]/g, '')
              .replace(',', '.')
              .replace(/.‒/g, '')
              .trim();
            const productCurrentPrice = $(el)
              .find('[data-purpose="product.price.current"]')
              .text()
              .replace(/["€*]/g, '')
              .replace(',', '.')
              .replace(/.‒/g, '')
              .trim();

            // not sure why no data
            // tried  typeof productSaving (string) &  productSaving.length (0),
            /*
            <div class="_yXeEMK49RPkE+6r-">
            <span class="_tBbIYxt08aknZp5O _ct-7A3TPX8s9vVX+ _9IKHT9jVjdivPUFm">-20% reduziert
            */
            const productSaving = $(el)
              .find('._tBbIYxt08aknZp5O._ct-7A3TPX8s9vVX+._9IKHT9jVjdivPUFm')
              .text();
            //  .replace(/[\\-\\%]/g, '');

            // save deal-details
            productsArray.push({
              name: productName,
              nameAndInfo: productNameAndInfo,
              productUrl: productUrl,
              oldPrice: productOldPrice,
              currentPrice: productCurrentPrice,
              savings: productSaving,
              category: dealsCategory[j].dbNumber,
            });
            console.log(
              'DATEN:',
              productName,
              productNameAndInfo,
              productUrl,
              productOldPrice,
              productCurrentPrice,
              productSaving,
            );

            // console.log(productOldPrice.length);
            // const fullProductUrl = baseUrl + productUrl;
            // const productCategory = dealsCategory[j].dbNumber;

            // add product to db
            // const addProductToDB = await addProduct(
            //   productName,
            //   fullProductUrl,
            //   productOldPrice,
            //   productCurrentPrice,
            //   productSaving,
            //   productCategory,
            // );
          },
        );
      } // end if
    }
    if (productsArray.length === 0) {
      res.status(405).json({
        errors: `Currently no deals on ${baseUrl}`,
      });
      return;
    }
    res.status(200).json({
      deals: productsArray,
    });
    return;
  }

  return res.status(405).json({
    errors: `Method not supported.`,
  });
}
