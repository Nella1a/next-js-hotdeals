'use client';

import { useState } from 'react';
import { ProductDetails } from '../page';
import Product from './product';

export type Shops = {
  id: number;
  name: string;
};

const Products = ({
  deals,
  shops,
}: {
  deals: ProductDetails[];
  shops: Shops[];
}) => {
  const [selected, setSelected] = useState(0);
  const filteredDeals = deals.filter((deal) =>
    selected === 0 ? true : deal.shop_id === selected,
  );

  return (
    <>
      <div className="flex mb-6">
        <select
          className="h-10 pl-2 text-left mb-0 w-32 rounded-md border-[1px] border-gray-300"
          id="selected"
          name="selected"
          onChange={(event) => setSelected(Number(event.currentTarget.value))}
        >
          <option value="">Filter Shop</option>
          <option value="1">moebelix</option>
          <option value="2">moemax</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-2">
        {filteredDeals.map((deal) => (
          <Product key={deal.title} deal={deal} shops={shops} />
        ))}
      </div>
    </>
  );
};

export default Products;
