import './global.css';
import Header from './components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="border-8 ">{children}</main>
      </body>
    </html>
  );
}
