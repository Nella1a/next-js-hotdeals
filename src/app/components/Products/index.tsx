'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ProductDetails } from '../../c/[slug]/page';
import DiscountSort from '../DiscountSort';
import FilterDeals from '../FilterDeals';
import { upperCaseFirstLetter } from '../Navigation';
import Product from '../Product';

export type Shops = {
  id: number;
  name: string;
};

export type UpdatedShops = {
  id: number;
  name: string;
  selected: boolean;
};

const Products = ({
  deals,
  shops,
  currentCategory,
  headerText,
}: {
  deals: ProductDetails[];
  shops: Shops[];
  currentCategory?: number;
  headerText?: string;
}) => {
  const [selectedShops, setSelectedShops] = useState(
    shops.map((shop) => ({ ...shop, selected: true })),
  );
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [dealsSortOrder, setDealsSortOrder] = useState('');
  const params = useParams<{ slug: string }>();

  // 1. Filter deals
  const filteredDeals = deals.filter((deal) => {
    const isShopSelected = selectedShops.some(
      (shop) => shop.selected && shop.id === deal.shop_id,
    );
    const isCategorySelected =
      !selectedCategory || deal.category_id === selectedCategory;

    return isShopSelected && isCategorySelected;
  });

  // 2. Sort filtered deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (dealsSortOrder === 'asc') return a.discount - b.discount;
    if (dealsSortOrder === 'desc') return b.discount - a.discount;
    return 0;
  });

  return (
    <>
      <h1 className="h-12 text-2xl flex items-center font-semibold">
        {headerText
          ? headerText
          : selectedCategory
          ? upperCaseFirstLetter(params.slug) + ' SALE'
          : 'Alle SALE Produkte'}
      </h1>

      <div className="flex gap-2 md:gap-4 absolute top-20 ">
        <FilterDeals
          selectedShops={selectedShops}
          setSelectedShops={setSelectedShops}
        />
        <DiscountSort setDealsSortOrder={setDealsSortOrder} />
      </div>

      {sortedDeals.length > 0 && (
        <>
          <div className="mb-2 text-right mt-36" data-testid={'productSum'}>
            {sortedDeals.length} Artikel
          </div>
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            data-testid="productCards"
          >
            {sortedDeals.map((deal, index) => (
              <Product
                key={`${index}-${deal.title}`}
                deal={deal}
                shops={selectedShops}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
