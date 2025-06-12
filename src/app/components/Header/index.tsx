import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full  bg-white">
      <div>
        <Link
          href="/"
          passHref
          className="text-[#e20015] no-underline block font-bold tracking-wide text-4xl text-center py-8"
        >
          %<span className="text-black">Möbel</span>Deals
        </Link>
      </div>
      <div className="flex justify-center items-center bg-[#333] p-3.5" />
    </header>
  );
}
