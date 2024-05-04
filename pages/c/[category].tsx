import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import Search from '../../components/search';
import placeHolderImg from '../../public/placeHolderImg.jpg';
import {
  productCategories,
  ProductCategories,
  ProductsCategory,
  readProductsByCategory,
} from '../../util/database';

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
        <section className="max-w-screen-lg  mx-auto flex flex-col justify-center items-center my-10 h-12 flex-nowrap sm:my-12">
          <h1 className="font-semibold capitalize  text-3xl m-3">
            {props.currentCategory}
          </h1>
          <p className="">Bald gibt es hier wieder tolle Angebote.</p>
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

      <section className="max-w-screen-lg  mx-auto flex justify-center items-center my-10 h-12 flex-nowrap sm:my-12">
        <h1 className="font-semibold capitalize">{props.currentCategory}</h1>
      </section>

      <section className="max-w-screen-lg  mx-auto flex justify-center items-center my-10 h-12 flex-nowrap sm:my-12">
        <div>
          {props.deals.map((deal) => {
            return (
              <article key={`deal${deal.id}${deal.productName}`}>
                <div>
                  <Link href={deal.productUrl} passHref>
                    <Image
                      src={placeHolderImg}
                      alt="icon logout"
                      width="228"
                      height="230"
                    />
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
