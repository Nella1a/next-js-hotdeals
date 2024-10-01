import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import placeHolderImg from '../public/placeHolderImg.jpg';

export const metadata: Metadata = {
  title: 'Get Deals',
};

export const readCategories = [
  { id: 0, category: 'topseller' },
  { id: 1, category: 'wohnzimmer' },
  { id: 2, category: 'schlafzimmer' },
  { id: 3, category: 'speisezimmer' },
  { id: 4, category: 'dekoration' },
  { id: 5, category: 'arbeitszimmer' },
  { id: 6, category: 'badezimmer' },
  { id: 7, category: 'garderobe' },
  { id: 8, category: 'kinderzimmer' },
  { id: 9, category: 'gartenmoebel' },
  { id: 10, category: 'kueche' },
  { id: 11, category: 'lampen-und-leuchten' },
  { id: 12, category: 'heimtextil' },
];

export default async function Deals() {
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
