import prisma from '../../../../../../prisma';
import { searchProducts } from '../../../../api/searchProducts';
import Products from '../../../../components/Products';
const getShops = async () => await prisma.shops.findMany();

const SearchResult = async ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const keywords = searchParams.getAll('q').join(' ');
  const products = await searchProducts(keywords);
  const shops = await getShops();

  return (
    <section className="mt-40 mx-auto max-w-screen-md py-2 px-4  md:max-w-screen-lg">
      <Products deals={products} shops={shops} />
    </section>
  );
};

export default SearchResult;
