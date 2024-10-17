import prisma from '../../../../prisma';
import Products from './components/products';

export interface ProductDetails {
  id: number;
  title: string;
  product_url: string;
  current_price: number;
  old_price: number;
  discount: number;
  category_id: number;
  shop_id: number;
  uvp: boolean;
}

const getDeals = async (category: string) => {
  console.log('category: ', category);
  const catId = await prisma.categories.findFirst({
    where: { name: category },
  });

  console.log('found category: ', catId);
  if (catId) {
    const cat = await prisma.products.findMany({
      where: { category_id: catId.id },
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
      <h1 className="h-12 mt-12 mb-10 md:mb-6 flex flex-col justify-center items-center text-xl font-semibold ">
        <span className="font-semibold capitalize">{params.category}</span>
      </h1>

      <section className="max-w-screen-md  mx-auto justify-center items-center px-4 md:max-w-screen-lg">
        <Products deals={filteredDeals} shops={shops} />
      </section>
    </>
  );
};
export default Category;
