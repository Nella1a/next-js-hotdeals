import prisma from '../../../../../../prisma';
import { searchProducts } from '../../../../api/searchProducts';
import LastUpdate from '../../../../components/LastUpdated';
import Products from '../../../../components/Products';
import BackToTop from '../../../[slug]/components/BackToTop';
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
        <>
          <BackToTop />
          <LastUpdate />
          <section className="max-w-screen-md mx-auto justify-center items-center md:max-w-screen-lg relative">
            <Products deals={products} shops={shops} heading={heading} />
          </section>
        </>
      ) : (
        <NoSearchResult />
      )}
    </section>
  );
};

export default SearchResult;
