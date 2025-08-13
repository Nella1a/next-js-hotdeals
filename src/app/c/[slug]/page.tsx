import prisma from '../../../../prisma';
import NoDeals from '../../components/NoDeals';
import BackToTop from './components/BackToTop';
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
  shopIsSelected?: boolean;
}

const getDeals = async (category: string) => {
  const catId = (await prisma.categories.findMany()).find(
    (cat) => cat.name === category,
  );

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
const getCategories = async () => await prisma.categories.findMany();

const Category = async (props: { params: Promise<{ slug: string }> }) => {
  const category = await props.params;
  const currentCat = (await prisma.categories.findMany()).find(
    (cat) => cat.name === category.slug,
  );
  const deals = await getDeals(category.slug);
  const shops = await getShops();

  return (
    <section className="mt-32 mx-auto max-w-screen-md py-2 px-4  md:max-w-screen-lg">
      <BackToTop />
      <p className="my-4 flex flex-col  justify-center items-start md:items-center text-xl font-semibold ">
        <span className="font-normal text-xs text-gray-500">
          Angebote zuletzt aktualisiert: 13.08.2025
        </span>
      </p>
      {!deals?.length ? (
        <NoDeals category={category.slug} />
      ) : (
        <section className="max-w-screen-md  mx-auto justify-center items-center  md:max-w-screen-lg relative">
          <Products
            deals={deals}
            shops={shops}
            currentCategory={currentCat?.id}
          />
        </section>
      )}
    </section>
  );
};
export default Category;
