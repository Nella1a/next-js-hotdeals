import Link from 'next/link';
import Search from '../Search';

export default function Header() {
  return (
    <header className="w-full  bg-white">
      <div>
        <Link
          href="/"
          passHref
          className="text-[#e20015] no-underline block font-bold tracking-wide text-4xl  mt-6 text-center py-6"
        >
          %<span className="text-black">Möbel</span>Deals
        </Link>
      </div>
      <Search />
    </header>
  );
}
