'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { ProductDetails } from '../page';
import Product from './product';

export type Shops = {
  id: number;
  name: string;
};

const Products = ({
  deals,
  shops,
  currentCategory,
}: {
  deals: ProductDetails[];
  shops: Shops[];
  currentCategory: number;
}) => {
  const [selectedShop, setSelectedShop] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.currentTarget.value;
    setSelectedCategory(Number(option));
  };

  const filteredDeals = deals.filter((deal) =>
    selectedShop === 0
      ? true
      : deal.shop_id === selectedShop && deal.category_id === selectedCategory,
  );

  useEffect(() => {}, [selectedCategory]);
  return (
    <>
      <div className="flex mb-6">
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
          <option value="">Filter Kategorie</option>
          <option value="1">Badezimmer</option>
          <option value="2">Schlafzimmer</option>
          <option value="3">Wohnzimmer</option>
        </select>
      </div>
      <div> {filteredDeals.length} Artikel</div>

      <div className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2">
        {filteredDeals?.length > 0 ? (
          filteredDeals.map((deal) => (
            <Product key={deal.title} deal={deal} shops={shops} />
          ))
        ) : (
          <p className="">Bald gibt es hier wieder tolle Angebote!</p>
        )}
      </div>
    </>
  );
};

export default Products;
