import './global.css';
import Header from './components/Header';
import Search from './components/Search';

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
