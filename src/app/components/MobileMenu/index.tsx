'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MenuBars from '../Icons/menubars';
import XMark from '../Icons/xmark';
import { upperCaseFirstLetter } from '../Navigation';

export default function MobileMenu({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const modalRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);

      // Remove "overflow-x-hidden" from <html>, added in global layout.tsx
      document.documentElement.classList.remove('overflow-x-hidden');

      return () => {
        document.body.style.overflow = 'unset';
        document.documentElement.classList.add('overflow-x-hidden');
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  return (
    <div>
      <div className="w-8 h-8">
        <button
          className="text-black cursor-pointer w-full"
          onClick={handleMobileMenu}
        >
          <MenuBars />
        </button>
      </div>
      {isMenuOpen && (
        <div className="bg-gray-500 w-screen h-screen top-0 left-0 opacity-50 absolute z-40" />
      )}
      <aside
        ref={modalRef}
        className={`
    fixed top-0 left-0 h-full w-52 md:w-sm bg-white z-50 py-3
    transform transition-transform duration-500 ease-in-out
    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
      >
        <ul className="flex flex-col w-full ">
          <li className="flex px-3 border-b  border-b-gray-400 py-4 items-center">
            <span className="font-semibold">Menu</span>
            <button
              className="text-black cursor-pointer  border border-gray-800 w-6 h-6 ml-auto"
              onClick={handleMobileMenu}
            >
              <XMark />
            </button>
          </li>

          <Link href="/c/sale" onClick={handleMobileMenu}>
            <li className="pl-3 flex min-h-16 items-center hover:bg-gray-100 font-medium">
              Produkte
            </li>
          </Link>

          {categories.map((cat) => (
            <Link href={`/c/${cat.name}`} key={cat.name}>
              <li
                className="pl-3 border-t  border-gray-200 min-h-16 flex items-center hover:bg-gray-100"
                onClick={handleMobileMenu}
              >
                {upperCaseFirstLetter(cat.name)}
              </li>
            </Link>
          ))}
        </ul>
      </aside>
    </div>
  );
}
