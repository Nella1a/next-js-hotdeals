import prisma from '../../../prisma';
import Navigation from '../components/Navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await prisma.categories.findMany();

  return (
    <>
      <header>
        <Navigation categories={categories} />
      </header>

      {children}
    </>
  );
}
