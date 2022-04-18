import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>Lorem Ipsum</div>
      <div>Lorem Ipsum</div>
      <Link href="/admin" passHref>
        <button>Login</button>
      </Link>
    </footer>
  );
}
