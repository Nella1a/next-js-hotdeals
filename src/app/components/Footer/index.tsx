import Link from 'next/link';
import SocialMediaIcons from '../SocialMediaIcons';

export default async function Footer() {
  return (
    <footer className="w-full bg-white mt-12 py-4">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center px-2.5 gap-3 justify-between">
        <Link
          href="/"
          passHref
          className="text-[#e20015] no-underline block font-bold text-sm md:text-lg text-left md:py-4"
        >
          %<span className="text-black">Möbel</span>Deals
        </Link>

        <ul className="flex gap-2 justify-center text-xs md:text-base ">
          <li>Impressum</li>
          <li>AGB</li>
          <li>Datenschutz</li>
        </ul>
        <SocialMediaIcons />
      </div>
    </footer>
  );
}
