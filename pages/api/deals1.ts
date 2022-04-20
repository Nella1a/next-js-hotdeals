import { NextApiRequest, NextApiResponse } from 'next';
// import { addProduct } from '../../util/database';
import { GetDealsReponseBody } from './deals2';
import cheerio from 'cheerio';
// const cheerio = require('cheerio');

// export type AddContractResponseBody =
//   | { errors: string }
//   | { message: string | undefined };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetDealsReponseBody>,
) {
  if (req.method === 'POST') {
    console.log('number;', req.body.hotdeals);
    const productsArray = [
      {
        name: '',
        url: '',
        priceOld: 0,
        priceCurrent: 0,
        discount: '',
        category: 0,
      },
    ];

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

      // load string into cheerio: create pseudo-DOM of website
      const $ = cheerio.load(newString);

      // get deals-container in DOM
      const checkCurrentDeals = $('[data-purpose="listing.productsContainer"]');

      // If deals-container exists loop trough each deal and get data
      if (checkCurrentDeals.html() !== 'null') {
        $('[data-purpose="listing.productsContainer"] article').each(
          (i, el) => {
            const productName = $(el).find('h3').text().replace(/,/g, '');

            const productUrl = $(el).find('a').attr('href');
            const productOldPrice = $(el)
              .find('[data-purpose="product.price.old"]')
              .next()
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

            const productSaving = $(el).find('._ggQHMv9W6taNwaY2').text();

            // save deal-details
            productsArray.push({
              name: productName,
              url: baseUrl + productUrl,
              priceOld: parseFloat(productOldPrice),
              priceCurrent: parseFloat(productCurrentPrice),
              discount: productSaving,
              category: dealsCategory[j].dbNumber,
            });
          },
        );
      }
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
