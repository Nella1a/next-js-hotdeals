'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DiscountSort from '../../../components/DiscountSort';
import FilterDeals from '../../../components/FilterDeals';
import { upperCaseFirstLetter } from '../../../components/Navigation';
import { ProductDetails } from '../page';
import Product from './product';

export type Shops = {
  id: number;
  name: string;
};

export type UpdatedShops = {
  id: number;
  name: string;
  selected: boolean;
};

export type Category =
  | {
      id: number;
      name: string;
    }
  | undefined;

const Products = ({
  deals,
  shops,
  currentCategory,
}: {
  deals: ProductDetails[];
  shops: Shops[];
  currentCategory?: number;
}) => {
  const [selectedShops, setSelectedShops] = useState(
    shops.map((shop) => ({ ...shop, selected: true })),
  );
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [products, setProducts] = useState(deals);
  const [dealsSortOrder, setDealsSortOrder] = useState('');
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    if (selectedCategory) {
      fetch(`/api/category/${selectedCategory}`)
        .then((response) => response.json())
        .then((catgegoryProducts) => {
          setProducts(catgegoryProducts);
        })
        .catch(() =>
          console.log(
            'Something went wrong while retrieving a product category.',
          ),
        );
    }
  }, [selectedCategory]);

  useEffect(() => {
    let sortedDeals = [...products];

    if (dealsSortOrder === 'asc') {
      sortedDeals.sort((a, b) => a.discount - b.discount);
    } else if (dealsSortOrder === 'desc') {
      sortedDeals.sort((a, b) => b.discount - a.discount);
    }
    setProducts(sortedDeals);
  }, [dealsSortOrder]);

  const filteredDeals = products.filter((deal) => {
    // Check if any shop is selected and matches the deal's shop_id
    const isShopSelected = selectedShops.some(
      (shop) => deal.shop_id === shop.id && shop.selected,
    );

    // Check if a category is selected
    const isCategorySelected =
      !selectedCategory || deal.category_id === selectedCategory;

    // Return true if both conditions are satisfied
    return isShopSelected && isCategorySelected;
  });

  return (
    <>
      <h1 className="h-12 text-2xl flex items-center font-semibold">
        {selectedCategory
          ? upperCaseFirstLetter(params.slug) + ' SALE'
          : 'Alle SALE Produkte'}
      </h1>
      <div className="flex gap-2 md:gap-4 absolute top-20 ">
        <FilterDeals
          selectedShops={selectedShops}
          setSelectedShops={setSelectedShops}
          products={products}
          setProducts={setProducts}
        />
        <DiscountSort setDealsSortOrder={setDealsSortOrder} />
      </div>

      {filteredDeals?.length > 0 && (
        <>
          <div className="mb-2 text-right mt-36" data-testid={'productSum'}>
            {filteredDeals.length} Artikel
          </div>
          <div
            className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2"
            data-testid="productCards"
          >
            {filteredDeals?.length > 0 &&
              filteredDeals?.map((deal, index) => (
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
