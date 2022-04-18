import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import {
  ProductsCategory,
  readProductsByCategory,
  productCategories,
  ProductCategories,
} from '../../util/database';
import Layout from '../../components/Layout';
import Image from 'next/image';
import placeHolderImg from '../../public/placeHolderImg.jpg';

import {
  captext,
  sectionOneCategorie,
  sectionTwoCategorie,
} from '../../components/elements';

type Props = {
  deals?: ProductsCategory[];
  currentCategory: string;
  getCategories: ProductsCategory[];
};

export default function Category(props: Props) {
  const [categories, setCategories] = useState(props.getCategories);

  if (props.deals === undefined) {
    return (
      <Layout>
        <Head>
          <title>Get Deals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section css={sectionOneCategorie}>
          {categories.map((category) => {
            return (
              <p key={`category-${category.id}`}>
                <Link href="/" passHref>
                  <a>{category.category}</a>
                </Link>
              </p>
            );
          })}
        </section>
        <section>
          <p>{props.currentCategory}</p>
          <p>Bald gibt es hier wieder tolle Angebote.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Get Deals</title>
      </Head>

      <section css={sectionOneCategorie}>
        {categories.map((category) => {
          return (
            <p key={`category-${category.id}`} css={captext}>
              <Link href="/" passHref>
                <a>{category.category}</a>
              </Link>
            </p>
          );
        })}
      </section>
      <section css={sectionTwoCategorie}>
        <h1 css={captext}>{props.currentCategory}</h1>
        <div>
          {props.deals.map((deal) => {
            return (
              <article key={`deal${deal.id}${deal.productName}`}>
                <div>
                  <Link href={deal.productUrl} passHref>
                    <a>
                      <Image
                        src={placeHolderImg}
                        alt="icon logout"
                        width="228"
                        height="230"
                      />
                    </a>
                  </Link>
                </div>
                <div>
                  {' '}
                  <p>{deal.productName}</p>
                </div>
                <div>
                  {' '}
                  <p>
                    <del>{deal.priceOld}</del>
                  </p>
                  <p>{deal.priceCurrent}</p>
                  <p>{deal.discount}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    deals?: ProductsCategory[];
    currentCategory: string;
    getCategories: ProductCategories[];
  }>
> {
  // get category
  const currentCategory = context.query.category;
  console.log(currentCategory);

  // get deals from db
  const getProducts = await readProductsByCategory(currentCategory);

  const getCategories = await productCategories();
  console.log(getCategories);
  return {
    props: {
      deals: getProducts,
      currentCategory,
      getCategories,
    },
  };
}
