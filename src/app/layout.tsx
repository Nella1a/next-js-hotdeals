import './global.css';
import Footer from './components/Footer';
import Header from './components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
