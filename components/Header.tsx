import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white h-20">
      <Link href="/" passHref>
        <a className="text-[#e20015] no-underline block font-bold lett tracking-wide leading-4 text-4xl min-h-10 mt-6 text-center py-6 border-0 rounded">
          %<span className="text-black">Möbel</span>Deals
        </a>
      </Link>
    </header>
  );
}
