'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FilterDeals from '../../../components/FilterDeals/page';
import { upperCaseFirstLetter } from '../../../components/Navigation/page';
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
      <div className="flex mb-6 gap-4">
        <FilterDeals
          selectedShops={selectedShops}
          setSelectedShops={setSelectedShops}
          products={products}
          setProducts={setProducts}
        />
      </div>

      <h1 className="">{upperCaseFirstLetter(params.slug)} SALE%</h1>
      {filteredDeals?.length > 0 && (
        <>
          <div className="mb-2"> {filteredDeals.length} Artikel</div>
          <div className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2">
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
