import Link from 'next/link';
import prisma from '../../../../prisma';
import MobileMenu from '../MobileMenu';
import Navigation from '../Navigation';
import SearchBox from '../SearchBox';

export default async function Header() {
  const categories = await prisma.categories.findMany();
  return (
    <header className="w-full bg-white fixed top-0 z-10" id="headerSection">
      <div className="max-w-screen-lg mx-auto flex flex-col  md:flex-row items-center justify-start px-3 py-4 md:gap-6 ">
        <div className="flex items-center justify-start gap-4 md:gap-6 w-full md:w-1/3">
          <MobileMenu categories={categories} />
          <Link
            href="/"
            passHref
            className="text-[#e20015] no-underline block font-bold tracking-wide  text-2xl md:text-3xl text-center py-4"
          >
            %<span className="text-black">Möbel</span>Deals
          </Link>
        </div>
        <SearchBox />
      </div>
      <div className="flex justify-center items-center bg-[#333] p-[1.5px]" />
      <Navigation categories={categories} />
    </header>
  );
}
