'use client';

import Link from 'next/link';

const upperCaseFirstLetter = (name: string) => {
  return name[0].toUpperCase() + name.slice(1);
};

const Navigation = ({
  categories,
}: {
  categories: { id: number; name: string }[];
}) => {
  return (
    <nav>
      <ul className="flex gap-5 p-5">
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
