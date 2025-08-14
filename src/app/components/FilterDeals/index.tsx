'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Shops, UpdatedShops } from '../../c/[slug]/components/products';
import { ProductDetails } from '../../c/[slug]/page';
import ButtonStyle from '../ButtonStyle';
import CheckBockCheck from '../Icons/checkBockChecked';

const FilterDeals = ({
  selectedShops,
  setSelectedShops,
  products,
}: {
  selectedShops: UpdatedShops[];
  setSelectedShops: Dispatch<SetStateAction<UpdatedShops[]>>;
  products: ProductDetails[];
  setProducts: Dispatch<SetStateAction<ProductDetails[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilters = () => setIsOpen(!isOpen);

  const handleShopFilter = (shop: Shops) => {
    const updateSelectedShops = selectedShops.map((selected) => {
      if (selected.id == shop.id) {
        return { ...selected, selected: !selected.selected };
      }
      return selected;
    });

    setSelectedShops(updateSelectedShops);
  };

  return (
    <>
      <section className="relative" data-testid="filterDeals">
        <ButtonStyle text={'Filter Shops'} handleOnChange={handleFilters} />
        <ul
          className={` overflow-hidden transition-all duration-500 ease-in-out
    border border-gray-300 rounded-sm bg-white mt-0.5 pt-1.5
    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
  `}
        >
          {selectedShops.map((shop) => (
            <li
              key={shop.name}
              className="py-1 pl-3"
              onClick={() => handleShopFilter(shop)}
            >
              <div className="flex gap-2">
                {shop.selected ? (
                  <span className="block w-6 h-6">
                    <CheckBockCheck />
                  </span>
                ) : (
                  <span className="border block w-6 h-6"></span>
                )}
                <span>{shop.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default FilterDeals;
