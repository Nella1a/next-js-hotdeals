import { css } from '@emotion/react';
import { useState } from 'react';

import Head from 'next/head';
import React from 'react';
import { readProducts } from '../util/database';

const flexStyle = css`
  display: flex;
  gap: 10px;
`;

export default function Deals(props) {
  const [filterDeals, setFilterDeals] = useState();
  const [products, setProducts] = useState(props.deals);

  function filterHandler() {
    console.log('selected number', filterDeals);
    const newArray = props.deals.filter((e) => e.categoryId === filterDeals);
    setProducts(newArray);
    console.log('Length new array', newArray.length);
    console.log('Length products', products.length);
  }

  if (props.deals === undefined) {
    return (
      <>
        <Head>
          <title>Get Deals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section>
          <h1>Upps.... Derzeit gibt es keine Deals verfügbar</h1>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Get Deals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              filterHandler();
            }}
          >
            <label htmlFor="filterDeals">Filter Deals by</label>
            <select
              id="filterDeals"
              name="filterDeals"
              value={filterDeals}
              onChange={(event) =>
                setFilterDeals(Number(event.currentTarget.value))
              }
            >
              <option value="0">--select--</option>
              <option value="1">Price</option>
              <option value="2">Discount</option>
              <option value="8">Category</option>
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
    </>
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
