import { useState } from 'react';
import prisma from '../../../../../../prisma';
import { searchProducts } from '../../../../api/searchProducts';
import DiscountSort from '../../../../components/DiscountSort';
import FilterDeals from '../../../../components/FilterDeals';
import { upperCaseFirstLetter } from '../../../../components/Navigation';
import Products from '../../../../components/Products';
import { SearchParams } from '../../page';
import { ProductDetails } from '../../../[slug]/page';
const getShops = async () => await prisma.shops.findMany();
import Product from '../../../../components/Product';

const SearchResult = async ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const keywords = searchParams.getAll('q').join(' ');
  const products = await searchProducts(keywords);
  const shops = await getShops();
  // return (
  //   <>
  //     <h1 className="h-12 text-2xl flex items-center font-semibold">
  //       XXX Artikeln gefunden Suchergebnis
  //     </h1>
  //     <div className="flex gap-2 md:gap-4 absolute top-20 ">
  //       {/* <FilterDeals
  //         selectedShops={shops}
  //         setSelectedShops={setSelectedShops}
  //         products={products}
  //         setProducts={setProducts}
  //       />
  //       <DiscountSort setDealsSortOrder={setDealsSortOrder} /> */}
  //     </div>

  //     {products?.length > 0 && (
  //       <>
  //         <div className="mb-2 text-right mt-36" data-testid={'productSum'}>
  //           {products.length} Artikel
  //         </div>
  //         <div
  //           className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2"
  //           data-testid="productCards"
  //         >
  //           {products?.length > 0 &&
  //             products?.map((deal, index) => (
  //               <Product
  //                 key={`${index}-${deal.title}`}
  //                 deal={deal}
  //                 shops={shops}
  //               />
  //             ))}
  //         </div>
  //       </>
  //     )}
  //   </>
  // );
  return (
    <>
      <Products deals={products} shops={shops} />
    </>
  );
};

export default SearchResult;
