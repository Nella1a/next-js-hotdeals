const NoDeals = ({ category }: { category: string }) => {
  return (
    <section className="max-w-screen-lg  mx-auto flex flex-col justify-center items-center my-10 flex-nowrap sm:my-12">
      <h1 className="font-semibold capitalize  text-3xl m-3">{category}</h1>
      <p className="">Bald gibt es hier wieder tolle Angebote.</p>
    </section>
  );
};

export default NoDeals;
