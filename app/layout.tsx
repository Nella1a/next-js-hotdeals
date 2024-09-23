import './global.css';
import Header from './c/components/Header';
import Search from './c/components/Search';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
          <Search />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
