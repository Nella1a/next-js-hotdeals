import prisma from '../../../../../../prisma';
import { searchProducts } from '../../../../api/searchProducts';
import Products from '../../../../components/Products';
import NoSearchResult from '../NoResult';
const getShops = async () => await prisma.shops.findMany();

const SearchResult = async ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const keywords = searchParams.getAll('q').join(' ');
  const products = await searchProducts(keywords);
  const shops = await getShops();

  const heading = `Suchergebnisse für '${keywords}'`;

  return (
    <section className="mt-40 mx-auto max-w-screen-md py-2 px-4  md:max-w-screen-lg">
      {products && products.length > 0 ? (
        <Products deals={products} shops={shops} heading={heading} />
      ) : (
        <NoSearchResult />
      )}
    </section>
  );
};

export default SearchResult;
