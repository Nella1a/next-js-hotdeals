import { Dispatch, SetStateAction, useState } from 'react';
import ButtonStyle from '../ButtonStyle';

const DiscountSort = ({
  setDealsSortOrder,
}: {
  setDealsSortOrder: Dispatch<SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleDiscountSort = () => {
    setIsOpen(!isOpen);
  };

  const handleDiscountSort = (order: string) => {
    setDealsSortOrder(order);
  };
  return (
    <div>
      <ButtonStyle text={'Rabatt'} handleOnChange={ToggleDiscountSort} />

      <ul
        className={`mt-0.5 pt-1.5 border border-gray-300 w-full rbg-white    overflow-hidden transition-all duration-500 ease-in-out
    rounded-sm bg-white ${
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}
      >
        <li
          onClick={() => handleDiscountSort('asc')}
          className="hover:bg-gray-100 hover:w-full py-1 pl-2"
        >
          % aufsteigend
        </li>
        <li
          className="hover:bg-gray-100 py-1 pl-2"
          onClick={() => handleDiscountSort('desc')}
        >
          % absteigend
        </li>
      </ul>
    </div>
  );
};

export default DiscountSort;
