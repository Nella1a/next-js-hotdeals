import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import {
  readProducts,
  productCategories,
  ProductCategories,
  ProductsCategory,
} from '../util/database';
import Layout from '../components/Layout';
import Image from 'next/image';
import {
  sectionOneIndex,
  sectionTwoIndex,
  captext,
} from '../components/elements';
import placeHolderImg from '../public/placeHolderImg.jpg';
import { GetServerSidePropsResult } from 'next';

type Props = {
  deals?: ProductsCategory[];
  readCategories: ProductCategories[];
};

export default function Deals(props: Props) {
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
      <section css={sectionOneIndex}>
        <p>Die besten Angebote.</p>
        <p>Für Dich zusammengestellt!</p>
      </section>

      <section css={sectionTwoIndex}>
        <h1>Suche nach Kategorien</h1>
        <div>
          {props.readCategories.map((productCategory) => {
            return (
              <div key={`deal${productCategory.id}`}>
                <Link href={`/c/${productCategory.category}`} passHref>
                  <a>
                    <Image
                      src={placeHolderImg}
                      alt="icon logout"
                      width="228"
                      height="230"
                    />
                  </a>
                </Link>
                <p css={captext}>{productCategory.category}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{
    deals?: ProductsCategory[];
    readCategories: ProductCategories[];
  }>
> {
  // get deals from db
  const getDeals = await readProducts();

  // get categories from db
  const readCategories = await productCategories();
  console.log(readCategories);
  return {
    props: {
      deals: getDeals,
      readCategories,
    },
  };
}
