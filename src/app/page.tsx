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

      <section className="flex flex-col max-w-screen-lg mx-auto justify-center items-center gap-8 ">
        {readCategories?.map((productCategory) => (
          <Link
            href={`/c/${productCategory.name}`}
            key={`deal${productCategory.id}`}
            className="bg-white p-4 border-2 w-3xs text-center hover:border-[#e20015]"
          >
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
