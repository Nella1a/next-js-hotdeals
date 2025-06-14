import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '../../prisma';

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
          <div
            key={`deal${productCategory.id}`}
            className="bg-white p-4 border-2 hover:border-[#e20015]"
          >
            <Link href={`/c/${productCategory.name}`}>
              <p className="font-semibold capitalize mt-2">
                {productCategory.name}
              </p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Deals;
