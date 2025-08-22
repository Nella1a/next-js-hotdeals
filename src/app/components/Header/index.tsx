import Link from 'next/link';
import prisma from '../../../../prisma';
import MobileMenu from '../MobileMenu';
import Navigation from '../Navigation';

export default async function Header() {
  const categories = await prisma.categories.findMany();
  return (
    <header className="w-full  bg-white fixed top-0 z-10">
      <div className="max-w-screen-lg mx-auto grid md:grid-cols-3 items-center grid-cols-[.5fr_5fr] px-3">
        <MobileMenu categories={categories} />
        <Link
          href="/"
          passHref
          className="text-[#e20015] no-underline block font-bold tracking-wide  text-2xl md:text-3xl text-center py-4"
        >
          %<span className="text-black">Möbel</span>Deals
        </Link>
      </div>
      <div className="flex justify-center items-center bg-[#333] p-1.5" />
      <Navigation categories={categories} />
    </header>
  );
}
