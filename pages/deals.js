import Head from 'next/head';
import React from 'react';
import { readProducts } from '../util/database';

export default function Deals(props) {
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
        {props.deals.map((deal) => {
          return (
            <div key={`deal${deal.id}`}>
              <p>{deal.productName}</p>
              <p>{deal.productUrl}</p>
              <p>€{deal.priceCurrent}</p>
              <p>€{deal.priceOld}.</p>
              <p>{deal.saving}</p>
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
  console.log(getDeals);

  return {
    props: {
      deals: getDeals,
    },
  };
}
