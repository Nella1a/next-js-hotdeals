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
        .then((data) => {
          setProducts(data);
          setSelectedCategory(selectedCategory);
        })
        .catch(() =>
          console.log(
            'Something went wrong while retrieving a product category.',
          ),
        );
    } else {
      fetch(`/api/product/`)
        .then((response) => response.json())
        .then((products) => {
          setProducts(products);
        })
        .catch(() =>
          console.log('Something went wrong while retrieving the products'),
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

    // Check if the category matches or if the category is 0 (all categories)
    const isCategorySelected =
      selectedCategory === 0 || deal.category_id === selectedCategory;

    // Return true if both conditions are satisfied
    return isShopSelected && isCategorySelected;
  });

  return (
    <>
      <h1 className="h-12 text-2xl flex items-center font-semibold">
        {upperCaseFirstLetter(params.slug)} SALE
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
        <div>
          <div className="mb-2 text-right mt-36">
            {filteredDeals.length} Artikel
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2 ">
            {filteredDeals?.length > 0 &&
              filteredDeals?.map((deal, index) => (
                <Product
                  key={`${index}-${deal.title}`}
                  deal={deal}
                  shops={selectedShops}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
