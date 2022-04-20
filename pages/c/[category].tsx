import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

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
  sectionOneIndex,
  sectionTwoCategorie,
} from '../../components/elements';
import Search from '../../components/search';

type Props = {
  deals?: ProductsCategory[] | undefined;
  currentCategory: string | string[] | undefined;
  // getCategories: ProductsCategory[];
};

export default function Category(props: Props) {
  // const [categories, setCategories] = useState(props.getCategories);

  // if (props.deals?.length === 0)
  console.log(props.deals);
  if (props.deals === undefined || props.deals.length === 0) {
    return (
      <Layout>
        <Head>
          <title>{props.currentCategory}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Search />
        <section css={sectionOneIndex}>
          <h1 css={captext}>{props.currentCategory}</h1>
        </section>
        <section css={sectionOneIndex}>
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
      <Search />

      <section css={sectionOneIndex}>
        <h1 css={captext}>{props.currentCategory}</h1>
      </section>

      <section css={sectionTwoCategorie}>
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
                    <del>€ {deal.priceOld}</del>
                  </p>
                  <p>€ {deal.priceCurrent}</p>
                  <p>
                    <span>{deal.discount}</span>
                  </p>
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
    currentCategory: string | string[] | undefined;
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
