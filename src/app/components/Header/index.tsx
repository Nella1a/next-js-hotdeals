import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full  bg-white fixed top-0 z-10">
      <div>
        <Link
          href="/"
          passHref
          className="text-[#e20015] no-underline block font-bold tracking-wide text-3xl text-center py-4"
        >
          %<span className="text-black">Möbel</span>Deals
        </Link>
      </div>
      <div className="flex justify-center items-center bg-[#333] p-1.5" />
    </header>
  );
}
