import { Dispatch, SetStateAction, useState } from 'react';
import { Shops, UpdatedShops } from '../../c/[slug]/components/products';
import { ProductDetails } from '../../c/[slug]/page';

const FilterDeals = ({
  selectedShops,
  setSelectedShops,
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
      <section className="border-2 relative">
        <button className="border-2 w-20" onClick={handleFilters}>
          Filter
        </button>
        {isOpen && (
          <section>
            <div>
              <ul>
                <li>Shops x</li>
                {selectedShops.map((shop) => (
                  <li key={shop.name}>
                    <label>
                      <input
                        type="checkbox"
                        checked={shop.selected || false}
                        onChange={() => handleShopFilter(shop)}
                      />
                      {shop.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Preis</p>
              <p>Selection of Preis</p>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default FilterDeals;
