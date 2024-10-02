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
    selected === 0 ? true : deal.shops_id === selected,
  );

  return (
    <>
      <div>
        {' '}
        <select
          className="border min-h-14 p-4 text-left mb-0 sm:w-96"
          id="selected"
          name="selected"
          onChange={(event) => setSelected(Number(event.currentTarget.value))}
        >
          <option value="">filter</option>
          <option value="1">möbelix</option>
          <option value="2">mömax</option>
        </select>
      </div>

      <div className="grid grid-cols-4">
        {filteredDeals.map((deal) => (
          <Product key={deal.title} deal={deal} shops={shops} />
        ))}
      </div>
    </>
  );
};

export default Products;
