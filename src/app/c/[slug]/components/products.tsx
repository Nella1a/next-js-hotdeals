'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { ProductDetails } from '../page';
import Product from './product';

export type Shops = {
  id: number;
  name: string;
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
  const [selectedShop, setSelectedShop] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [products, setProducts] = useState(deals);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.currentTarget.value;
    setSelectedCategory(Number(option));
  };

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
    const shopMatches = selectedShop === 0 || deal.shop_id === selectedShop;
    const categoryMatches =
      selectedCategory === 0 || deal.category_id === selectedCategory;
    return shopMatches && categoryMatches;
  });

  // todo: make select reusable and add sorting logic for deals
  return (
    <>
      <div className="flex mb-6 gap-4">
        <select
          className="h-10 pl-2 text-left mb-0 w-40 rounded-md border-[1px] border-gray-300"
          id="selectedShop"
          name="selectedShop"
          onChange={(event) =>
            setSelectedShop(Number(event.currentTarget.value))
          }
        >
          <option value="0">Filter Shops</option>
          <option value="1">moebelix</option>
          <option value="2">moemax</option>
        </select>
        <select
          className="h-10 pl-2 text-left mb-0 w-40 rounded-md border-[1px] border-gray-300"
          id="searchbox"
          name="searchbox"
          onChange={(event) => handleOnChange(event)}
          value={selectedCategory}
        >
          <option value="0">Filter Kategorie</option>
          <option value="1">Badezimmer</option>
          <option value="2">Schlafzimmer</option>
          <option value="3">Wohnzimmer</option>
        </select>
      </div>
      {filteredDeals?.length > 0 && (
        <div className="mb-2"> {filteredDeals.length} Artikel</div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2">
        {filteredDeals?.length > 0 ? (
          filteredDeals.map((deal, index) => (
            <Product key={`${index}-${deal.title}`} deal={deal} shops={shops} />
          ))
        ) : (
          <p className="">Bald gibt es hier wieder tolle Angebote!</p>
        )}
      </div>
    </>
  );
};

export default Products;
