import { addProduct } from '../../util/database';
const cheerio = require('cheerio');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const baseUrl = 'https://www.moemax.at';
    const headers = {
      Cookie:
        '__cf_bm=kGvHo.NF0o5iXhgmNUblBEkrw7h_0ZCNqIigXJ1eYKc-1650104946-0-AbQ1xwkvZvzwLUxp2lHd9OZJGSBxiKMVGiBXluzAaa5ZYbMHjciAH4tvhyzKFT4V8FwU12D53+Yx3TKUN0n69A8=',
      'user-agent': 'PostmanRuntime/7.29.0',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    };

    const response = await fetch(`https://www.moemax.at/c/wohnzimmer-sale`, {
      headers,
    });

    const htmlString = await response.text();
    const indexPosition = htmlString.indexOf('window.__');
    const newString = htmlString.slice(0, indexPosition);

    // load string into cheerio
    const $ = cheerio.load(newString);

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

        const fullFroductMoemaxUrl = baseUrl + productMoemaxUrl;

        // add product to db
        const addProductToDB = await addProduct(
          productMoemaxName,
          fullFroductMoemaxUrl,
          productMoemaxOldPrice,
          productMoemaxCurrentPrice,
          productMoemaxSaving,
        );

        console.log(addProductToDB);
      },
    );
    res.status(200).json({
      message: 'new deals in db',
    });
    return;
  }
  return res.status(405).json({
    error: `Method not supported.`,
  });
}
