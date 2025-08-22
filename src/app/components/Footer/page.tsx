import Link from 'next/link';

export default async function Footer() {
  return (
    <footer className="w-full bg-white mt-12">
      <div className="border-2 max-w-screen-lg mx-auto flex gap-1.5 items-center">
        <Link
          href="/"
          passHref
          className="text-[#e20015] no-underline block font-bold text-sm md:text-lg text-center py-4"
        >
          %<span className="text-black">Möbel</span>Deals
        </Link>
        <div className="text-xs">2025 %MöbelDeals</div>
      </div>
    </footer>
  );
}
