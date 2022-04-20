import Link from 'next/link';
import { headerStyle } from './elements';

export default function Header() {
  return (
    <header css={headerStyle}>
      <Link href="/" passHref>
        <a>
          %<span>Möbel</span>Deals
        </a>
      </Link>
    </header>
  );
}
