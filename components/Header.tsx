import Link from 'next/link';
import { useEffect, useState } from 'react';
import { headerStyle } from './elements';

export default function Header() {
  return (
    <header css={headerStyle}>
      <nav>
        <Link href="/" passHref>
          <a>LOGO</a>
        </Link>

        <Link href="/admin" passHref>
          <button>Login</button>
        </Link>
      </nav>
    </header>
  );
}
