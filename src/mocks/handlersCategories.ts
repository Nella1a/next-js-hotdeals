import { http, HttpResponse } from 'msw';

export const handlerLivingroom = [
  http.get('http://localhost:3000/livingroom', () => {
    return HttpResponse.json({
      deals: [
        {
          id: 66,
          title: 'product one in category livingroom',
          current_price: 19900,
          old_price: 29900,
          discount: 33,
          product_url: 'https://externalproducturl.at/livingroom-product-one',
          img_url: null,
          created: '2025-08-11T13:25:55.596Z',
          shop_id: 2,
          category_id: 3,
          uvp: true,
        },
        {
          id: 67,
          title: 'product two in category livingroom',
          current_price: 11960,
          old_price: 29900,
          discount: 60,
          product_url: 'https://externalproducturl.at/livingroom-product-two',
          img_url: null,
          created: '2025-08-11T13:25:55.658Z',
          shop_id: 1,
          category_id: 3,
          uvp: true,
        },
        {
          id: 68,
          title: 'product three in category livingroom',
          current_price: 5370,
          old_price: 8950,
          discount: 40,
          product_url: 'https://externalproducturl.at/livingroom-product-three',
          img_url: null,
          created: '2025-08-11T13:25:55.668Z',
          shop_id: 1,
          category_id: 3,
          uvp: true,
        },
      ],
    });
  }),
];

export const handlerBathroom = [
  http.get('http://localhost:3000/c/bathroom', () => {
    return HttpResponse.json({
      deals: [
        {
          id: 34,
          title: 'product one in category bathroom',
          current_price: 17910,
          old_price: 19900,
          discount: 10,
          product_url: 'https://externalproducturl.at/bathroom-product-one',
          img_url: null,
          created: '2025-08-11T13:19:20.207Z',
          shop_id: 2,
          category_id: 1,
          uvp: true,
        },
        {
          id: 35,
          title: 'product two in category bathroom',
          current_price: 33210,
          old_price: 36900,
          discount: 10,
          product_url: 'https://externalproducturl.at/bathroom-product-two',
          img_url: null,
          created: '2025-08-11T13:19:20.212Z',
          shop_id: 1,
          category_id: 1,
          uvp: true,
        },
        {
          id: 36,
          title: 'product three in category bathroom',
          current_price: 17010,
          old_price: 18900,
          discount: 10,
          product_url: 'https://externalproducturl.at/bathroom-product-three',
          img_url: null,
          created: '2025-08-11T13:19:20.216Z',
          shop_id: 1,
          category_id: 1,
          uvp: true,
        },
      ],
    });
  }),
];

export const handlerBedroom = [
  http.get('http://localhost:3000/c/bedroom', () => {
    return HttpResponse.json({
      deals: [
        {
          id: 30,
          title: 'product one in category bedroom ',
          current_price: 26910,
          old_price: 29900,
          discount: 10,
          product_url: 'https://externalproducturl.at/bedroom-product-one',
          img_url: null,
          created: '2025-08-11T13:19:20.196Z',
          shop_id: 2,
          category_id: 1,
          uvp: true,
        },
        {
          id: 31,
          title: 'product two in category bedroom',
          current_price: 17910,
          old_price: 19900,
          discount: 10,
          product_url: 'https://externalproducturl.at/bedroom-product-two',
          img_url: null,
          created: '2025-08-11T13:19:20.199Z',
          shop_id: 1,
          category_id: 1,
          uvp: true,
        },
        {
          id: 32,
          title: 'product three in category bedroom',
          current_price: 26910,
          old_price: 29900,
          discount: 10,
          product_url: 'https://externalproducturl.at/bedroom-product-three',
          img_url: null,
          created: '2025-08-11T13:19:20.202Z',
          shop_id: 1,
          category_id: 1,
          uvp: true,
        },
      ],
    });
  }),
];
