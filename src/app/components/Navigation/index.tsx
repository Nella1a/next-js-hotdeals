'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MenuBars from '../Icons/menubars';
import MobileMenu from '../MobileMenu';

export const upperCaseFirstLetter = (name: string) => {
  return name[0].toUpperCase() + name.slice(1);
};

const Navigation = ({
  categories,
}: {
  categories: { id: number; name: string }[];
}) => {
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
    <nav className="border-b border-gray-200 bg-white opacity-100 shadow-sm fixed top-20  w-full z-10">
      <ul className="flex gap-5 py-2 mx-auto max-w-screen-md justify-start items-center px-4 md:max-w-screen-lg">
        <li>
          <div className="w-8 h-8 ">
            <button
              className="text-black cursor-pointer w-full"
              onClick={handleMobileMenu}
            >
              <MenuBars />
            </button>
          </div>
        </li>
        <li className="hidden md:block">
          <Link href="/">Produkte</Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.name} className="hidden md:block">
            <Link href={`/c/${cat.name}`}>
              {upperCaseFirstLetter(cat.name)}
            </Link>
          </li>
        ))}
      </ul>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-40 opacity-30" />
      )}
      <MobileMenu
        categories={categories}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        modalRef={modalRef}
      />
    </nav>
  );
};
export default Navigation;
