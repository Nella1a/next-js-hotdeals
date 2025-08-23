import NoDeals from '../../components/NoDeals';
import BackToTop from './components/BackToTop';
import prisma from '../../../../prisma';
import Products from '../../components/Products';
import LastUpdate from '../../components/LastUpdated';

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
  if (category === 'sale') {
    return await prisma.hproducts.findMany();
  }

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

const Category = async (props: { params: Promise<{ slug: string }> }) => {
  const category = await props.params;
  const currentCat = (await prisma.categories.findMany()).find(
    (cat) => cat.name === category.slug,
  );
  const deals = await getDeals(category.slug);
  const shops = await getShops();

  return (
    <section className="mt-40 mx-auto max-w-screen-md py-2 px-4  md:max-w-screen-lg">
      <BackToTop />
      <LastUpdate />
      {deals && deals.length === 0 ? (
        <NoDeals category={category.slug} />
      ) : (
        <section className="max-w-screen-md mx-auto justify-center items-center md:max-w-screen-lg relative">
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
