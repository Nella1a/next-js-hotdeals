import { Dispatch, SetStateAction, useState } from 'react';
import { Shops, UpdatedShops } from '../../c/[slug]/components/products';
import { ProductDetails } from '../../c/[slug]/page';
import ButtonStyle from '../ButtonStyle';

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
  const [isOpen, setIsOpen] = useState(true);
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
      <section className="relative z-50">
        <ButtonStyle text={'Filter Shops'} handleOnChange={handleFilters} />

        {isOpen && (
          <ul className="mt-0.5 pt-3.5 border border-gray-300  rounded-sm">
            {selectedShops.map((shop) => (
              <li key={shop.name} className="p-2">
                <label className="flex gap-2 items-start justify-start">
                  <span className="">
                    <input
                      className="w-5 h-5"
                      type="checkbox"
                      checked={shop.selected || false}
                      onChange={() => handleShopFilter(shop)}
                    />
                  </span>

                  <span>{shop.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default FilterDeals;
