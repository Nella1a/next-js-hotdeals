import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../prisma';

export const metadata: Metadata = {
  title: 'MoebelDeals',
};

const Deals = async () => {
  const readCategories = await prisma.categories.findMany();
  return (
    <>
      <h1 className="h-32 max-w-screen-lg mx-auto  my-12 flex flex-col justify-center items-center text-xl font-semibold sm:flex-row mt-44 bg-white shadow-md">
        <span className="inline-block text-[#e20015]">
          Die besten Angebote.
        </span>
        <span className="inline-block">Für dich zusammengestellt!</span>
      </h1>

      <section className="max-w-screen-lg mx-auto justify-center items-center grid gap-4 md:grid-cols-3">
        {readCategories?.map((productCategory, index) => (
          <Link
            href={`/c/${productCategory.name}`}
            key={`deal${productCategory.id}`}
            className="rounded-md text-center flex-col md:gap-2 items-center hover:opacity-80 bg-white p-4"
          >
            <div className="flex justify-center">
              <div className="w-[200px] md:w-[600px]">
                <Image
                  src={`/imgCat-0${index}.jpg`}
                  width={500}
                  height={500}
                  alt={`category image ${productCategory.name}`}
                  className="rounded-md"
                />
              </div>
            </div>
            <p className="font-semibold capitalize mt-2">
              {productCategory.name}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Deals;
