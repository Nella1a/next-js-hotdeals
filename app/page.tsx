import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Search from '../components/search';
import placeHolderImg from '../public/placeHolderImg.jpg';
import { productCategories } from '../util/database';

export const metadata: Metadata = {
  title: 'Get Deals',
};

export default async function Deals() {
  const readCategories = await productCategories();
  return (
    <>
      <section className="max-w-screen-lg  mx-auto flex justify-center items-center my-10 h-12 flex-nowrap sm:my-12 ">
        <p className="flex flex-col justify-center items-center text-xl font-semibold p-0 sm:flex-row">
          <span className="inline-block text-[#e20015]">
            Die besten Angebote.
          </span>
          <span className="inline-block"> Für dich zusammengestellt!</span>
        </p>
      </section>

      <section className="max-w-screen-lg mx-auto justify-items-center items-center pt-0 px-7 grid grid-cols-2 gap-y-1 sm:grid-cols-3  lg:grid-cols-4 lg:w-10/12 xl:w-9/12">
        {readCategories.map((productCategory) => {
          return (
            <div key={`deal${productCategory.id}`} className="p-2">
              <Link href={`/c/${productCategory.category}`}>
                <Image
                  src={placeHolderImg}
                  alt="icon logout"
                  width="228"
                  height="230"
                />
              </Link>
              <p className="font-semibold capitalize">
                {productCategory.category}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
