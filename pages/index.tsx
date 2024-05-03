import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import Search from '../components/search';
import placeHolderImg from '../public/placeHolderImg.jpg';
import { productCategories, ProductCategories } from '../util/database';

type Props = {
  // deals?: ProductsCategory[];
  readCategories: ProductCategories[];
};

export default function Deals(props: Props) {
  return (
    <Layout>
      <Head>
        <title>Get Deals</title>
      </Head>
      <Search />

      <section className="max-w-screen-lg  mx-auto flex justify-center items-center my-10 h-12 flex-nowrap sm:my-12 ">
        <p className="flex flex-col justify-center items-center text-xl font-semibold p-0 sm:flex-row">
          <span className="inline-block text-[#e20015]">
            Die besten Angebote.
          </span>
          <span className="inline-block"> Für dich zusammengestellt!</span>
        </p>
      </section>

      <section className="max-w-screen-lg mx-auto justify-items-center items-center pt-0 px-7 grid grid-cols-2 gap-y-1 sm:grid-cols-3  lg:grid-cols-4 lg:w-10/12 xl:w-9/12">
        {props.readCategories.map((productCategory) => {
          return (
            <div key={`deal${productCategory.id}`} className="p-2">
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
              <p className="font-semibold capitalize">
                {productCategory.category}
              </p>
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{
    // deals?: ProductsCategory[];
    readCategories: ProductCategories[];
  }>
> {
  // get deals from db
  // const getDeals = await readProducts();

  // get categories from db
  const readCategories = await productCategories();
  console.log(readCategories);
  return {
    props: {
      // deals: getDeals,
      readCategories,
    },
  };
}
