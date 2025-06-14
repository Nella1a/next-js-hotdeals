import prisma from '../../../../prisma';
import { getCategories } from '../../page';
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
  const catId = (await getCategories()).find((cat) => cat.name === category);

  if (catId?.id) {
    const cat = await prisma.hproducts.findMany({
      where: {
        category_id: catId.id,
        discount: {
          gt: 0,
        },
      },
    });
    return cat;
  }
  return [] as ProductDetails[];
};

const getShops = async () => await prisma.shops.findMany();

const Category = async (props: { params: Promise<{ slug: string }> }) => {
  const category = await props.params;
  const currentCat = (await getCategories()).find(
    (cat) => cat.name === category.slug,
  );
  const deals = await getDeals(category.slug);
  const shops = await getShops();

  if (!deals?.length) {
    return (
      <>
        <section className="max-w-screen-lg  mx-auto flex flex-col justify-center items-center my-10 flex-nowrap sm:my-12">
          <h1 className="font-semibold capitalize  text-3xl m-3">
            {category.slug}
          </h1>
          <p className="">Bald gibt es hier wieder tolle Angebote.</p>
        </section>
      </>
    );
  }

  return (
    <>
      {' '}
      <h1 className="h-12 mt-2 mb-10 md:mb-6 flex flex-col justify-center items-center text-xl font-semibold ">
        <span className="font-normal text-xs text-gray-500">
          Angebote vom 02.11.2024
        </span>
      </h1>
      <section className="max-w-screen-md  mx-auto justify-center items-center px-4 md:max-w-screen-lg">
        <Products
          deals={deals}
          shops={shops}
          currentCategory={currentCat?.id}
        />
      </section>
    </>
  );
};
export default Category;
