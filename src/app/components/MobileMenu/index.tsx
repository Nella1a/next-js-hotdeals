'use client';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import XMark from '../Icons/xmark';
import { upperCaseFirstLetter } from '../Navigation';

export default function MobileMenu({
  categories,
  isMenuOpen,
  setIsMenuOpen,
  modalRef,
}: {
  categories: { id: number; name: string }[];
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  modalRef: React.RefObject<HTMLElement | null>;
}) {
  const handleCloseMobileMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <aside
      ref={modalRef}
      className={`
    fixed top-0 left-0 h-full w-52 md:w-sm bg-white z-50 py-3
    transform transition-transform duration-500 ease-in-out
    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
    >
      <ul className="flex flex-col  w-full ">
        <li className="flex px-3 border-b  border-b-gray-400 py-4 items-center">
          <span className="font-semibold">Menu</span>
          <button
            className="text-black cursor-pointer  border border-gray-800 w-6 h-6 ml-auto"
            onClick={handleCloseMobileMenu}
          >
            <XMark />
          </button>
        </li>
        <li className="pl-3 flex min-h-16 items-center hover:bg-gray-100 font-medium">
          <Link href="/">Produkte</Link>
        </li>
        {categories.map((cat) => (
          <li
            key={cat.name}
            className="pl-3 border-t  border-gray-200  min-h-16 flex items-center hover:bg-gray-100"
            onClick={handleCloseMobileMenu}
          >
            <Link href={`/c/${cat.name}`}>
              {upperCaseFirstLetter(cat.name)}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
