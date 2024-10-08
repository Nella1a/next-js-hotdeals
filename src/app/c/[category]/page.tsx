import prisma from '../../../../prisma';
import Products from './components/products';

export interface ProductDetails {
  id: number;
  title: string;
  product_url: string;
  current_price: number;
  old_price: number;
  discount: number;
  categories_id: number;
  shops_id: number;
}

const getDeals = async (category: string) => {
  console.log('category: ', category);
  const catId = await prisma.categories.findFirst({
    where: { name: category },
  });

  console.log('found category: ', catId);
  if (catId) {
    const cat = await prisma.products.findMany({
      where: { categories_id: catId.id },
    });

    return cat;
  }
  return [] as ProductDetails[];
};

const Category = async ({ params }: { params: { category: string } }) => {
  const deals = await getDeals(params.category);
  const shops = await prisma.shops.findMany();
  const filteredDeals = deals?.filter((deal) => deal.discount);

  if (!deals?.length) {
    return (
      <>
        <section className="max-w-screen-lg  mx-auto flex flex-col justify-center items-center my-10 flex-nowrap sm:my-12">
          <h1 className="font-semibold capitalize  text-3xl m-3">
            {params.category}
          </h1>
          <p className="">Bald gibt es hier wieder tolle Angebote.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <h1 className="my-10 h-12 flex flex-col justify-center items-center text-xl font-semibold p-0 sm:flex-row sm:my-12">
        <span className="font-semibold capitalize">{params.category}</span>
      </h1>
      <section className="bordder-2 border-black max-w-screen-md  mx-auto justify-center items-center my-10 sm:my-12 px-4">
        <Products deals={filteredDeals} shops={shops} />
      </section>
    </>
  );
};
export default Category;
