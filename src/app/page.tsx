import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../prisma';
import placeHolderImg from '../../public/placeHolderImg.jpg';

export const metadata: Metadata = {
  title: 'MoebelDeals',
};

const Deals = async () => {
  const readCategories = await prisma.categories.findMany();
  return (
    <>
      <h1 className="h-12 my-12 flex flex-col justify-center items-center text-xl font-semibold sm:flex-row">
        <span className="inline-block text-[#e20015]">
          Die besten Angebote.
        </span>
        <span className="inline-block"> Für dich zusammengestellt!</span>
      </h1>

      <section className="flex flex-col md:flex-row max-w-screen-lg mx-auto justify-center items-center gap-8 ">
        {readCategories?.map((productCategory) => (
          <div key={`deal${productCategory.id}`} className="bg-white p-4">
            <Link href={`/c/${productCategory.name}`}>
              <Image
                src={placeHolderImg}
                alt="icon logout"
                width="228"
                height="230"
              />
            </Link>
            <p className="font-semibold capitalize mt-2">
              {productCategory.name}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Deals;
