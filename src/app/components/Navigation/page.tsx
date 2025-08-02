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
    <nav className="border-b border-gray-200 shadow-sm">
      <ul className="flex gap-5 py-2 px-5">
        <li>
          <Link href="/">Produkte</Link>
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
