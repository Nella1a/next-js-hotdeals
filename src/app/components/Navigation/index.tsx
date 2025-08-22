'use client';

import Link from 'next/link';

export const upperCaseFirstLetter = (name: string) => {
  return name[0].toUpperCase() + name.slice(1);
};

const Navigation = ({
  categories,
}: {
  categories: { id: number; name: string }[];
}) => {
  return (
    <nav className="border-b border-gray-200 bg-white opacity-100 shadow-sm fixed top-20 w-full z-10 hidden md:block">
      <ul
        className="flex gap-5 py-2 mx-auto max-w-screen-md justify-start items-center px-4 md:max-w-screen-lg"
        data-testid="navigationLinks"
      >
        <li className="hidden md:block">
          <Link href="/c/sale">Produkte</Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.name}>
            <Link href={`/c/${cat.name}`}>
              {upperCaseFirstLetter(cat.name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
