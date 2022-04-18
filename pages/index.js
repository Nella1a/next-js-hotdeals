import { css } from '@emotion/react';
import { useState } from 'react';

import Head from 'next/head';
import React from 'react';
import { readProducts } from '../util/database';
import Layout from '../components/Layout';

const flexStyle = css`
  display: flex;
  gap: 10px;
`;

export default function Deals(props) {
  const [filterDealsByPrice, setFilterDealsByPrice] = useState();
  const [filterDealsByCategory, setFilterDealsByCategory] = useState();
  const [filterDealsByDiscount, setFilterDealsByDiscount] = useState();
  const [products, setProducts] = useState(props.deals);

  function filterHandler() {
    console.log('selected number', filterDealsByPrice);
    const newArray = props.deals.filter(
      (e) => e.categoryId === filterDealsByPrice,
    );
    setProducts(newArray);
    console.log('Length new array', newArray.length);
    console.log('Length products', products.length);
  }

  if (props.deals === undefined) {
    return (
      <Layout>
        <Head>
          <title>Get Deals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section>
          <h1>Upps.... Derzeit gibt es keine Deals verfügbar</h1>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Get Deals</title>
      </Head>
      <section>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              filterHandler();
            }}
          >
            <label htmlFor="filterDealsByPrice">Filter Deals by Price</label>
            <select
              id="filterDealsByPrice"
              name="filterDealsByPrice"
              value={filterDealsByPrice}
              onChange={(event) =>
                setFilterDealsByPrice(Number(event.currentTarget.value))
              }
            >
              <option value="0">--select--</option>
              <option value="1">unter € 20</option>
              <option value="2">unter € 50</option>
              <option value="3">unter € 100</option>
              <option value="4">über € 100</option>
            </select>
            <label htmlFor="filterDealsByCategory">
              Filter Deals by Category
            </label>
            <select
              id="filterDealsByCategory"
              name="filterDealsByCategory"
              value={filterDealsByCategory}
              onChange={(event) =>
                setFilterDealsByCategory(Number(event.currentTarget.value))
              }
            >
              <option value="0">--select--</option>
              <option value="1">Wohnzimmer</option>
              <option value="2">Schlafzimmer</option>
              <option value="3">Speisezimmer</option>
              <option value="4">Dekoration</option>
              <option value="5">Arbeitszimmer</option>
              <option value="6">Badezimmer</option>
              <option value="7">Garderobe</option>
              <option value="8">Kinderzimmer</option>
              <option value="9">Gartenmoebel</option>
              <option value="10">Küche / Kochen / essen</option>
              <option value="11">Lampen und Leuchten</option>
              <option value="12">Heimtextilien</option>
            </select>
            <label htmlFor="filterDealsByDiscount">
              Filter Deals by Discount
            </label>
            <select
              id="filterDealsByDiscount"
              name="filterDealsByDiscount"
              value={filterDealsByDiscount}
              onChange={(event) =>
                setFilterDealsByDiscount(Number(event.currentTarget.value))
              }
            >
              <option value="0">--select--</option>
              <option value="1"> bis zu 20%</option>
              <option value="2"> bis zu 30%</option>
              <option value="3">bis zu 50%</option>
              <option value="4">über 50%</option>
            </select>

            <button>Submit</button>
          </form>
        </div>

        {products.map((deal) => {
          return (
            <div key={`deal${deal.id}`} css={flexStyle}>
              <p>{deal.categoryId}</p>
              <p>{deal.productName}</p>
              <p>{deal.productUrl}</p>
              <p>€{deal.priceCurrent}</p>
              <p>€{deal.priceOld}.</p>
              <p>{deal.discount}</p>
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  // get deals from db
  const getDeals = await readProducts();
  // console.log(getDeals);

  return {
    props: {
      deals: getDeals,
    },
  };
}
