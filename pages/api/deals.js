import * as fs from 'node:fs';
import { addProduct } from '../../util/database';
const cheerio = require('cheerio');

export default async function handler(req, res) {
  /* const products = [
    {
      name: "",
      url: "",
      priceOld: "",
      priceCurrent: "",
      saving: ""
    }
  ];
*/

  const writeStream = fs.createWriteStream('post.csv');

  // Write Headers;
  writeStream.write(`ProductName,URL,OldPrice,NewPrice,Saving\n`);

  if (req.method === 'POST') {
    const username = req.body.TWuser;
    console.log('UserName-API:', username);
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
    const output = $('[data-purpose="listing.productsContainer"]');
    console.log(output);
    // const childrenHref = output.children("href").text();
    // const childrenHref = output.find("a");

    // loop to get names of products and href
    /* $('[data-purpose="listing.productsContainer"] a').each((i, el) => {
      const item = $(el).text();
      const link = $(el).attr("href");
      console.log(item, link);
    }); */
    // class="_d9CE7I60YYyUDrcS _Qqfpyw9j-SjRVm7g _O0cHS0-xdCNaU8MF _ne7vhnMjgDvpfr8I" data-purpose="listing.productsContainer"><div><article class="_P+dE9HsyHPTsQmVf _jcT2kfddTCMhMsUm"><div class="_y6dmV1r0DP+Zt1kp">
    // console.log(output.html());
    // console.log(pretty(output.html()));
    // console.log(childrenHref.text());

    // '[data-purpose="listing.productsContainer"] article'
    // _P+dE9HsyHPTsQmVf _jcT2kfddTCMhMsUm

    $('[data-purpose="listing.productsContainer"] article').each(
      async (i, el) => {
        const productMoemaxName = $(el).find('h3').text().replace(/,/g, '');

        const productMoemaxUrl = $(el).find('a').attr('href');
        const productMoemaxOldPrice = $(el)
          .find('[data-purpose="product.price.old"]')
          .text();
        const productMoemaxCurrentPrice = $(el)
          .find('[data-purpose="product.price.current"]')
          .text();

        const productMoemaxSaving = $(el).find('._ggQHMv9W6taNwaY2').text();

        // write to CSV-File
        writeStream.write(
          `${productMoemaxName}, ${productMoemaxUrl}, ${productMoemaxOldPrice}, ${productMoemaxCurrentPrice}, ${productMoemaxSaving}\n`,
        );

        const baseUrl = 'https://www.moemax.at';

        const fullFroductMoemaxUrl = baseUrl + productMoemaxUrl;

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
    console.log('scraping Done');
    res.status(200).json({
      user: username,
    });
    return;
  }
  return res.status(405).json({
    error: `Method not supported.`,
  });
}
