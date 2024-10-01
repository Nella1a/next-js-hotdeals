import Image from 'next/image';
import Link from 'next/link';
import placeHolderImg from '../../../../public/placeHolderImg.jpg';

export type ProductsCategory = {
  id: number;
  productName: string;
  productUrl: string;
  priceCurrent: number;
  priceOld: number;
  discount: string;
  categoryId: number;
  category: string;
};

type Props = {
  deals?: ProductsCategory[] | undefined;
  currentCategory: string | string[] | undefined;
  params: { [key: string]: string };
};

const Category = async (props: Props) => {
  const currentCategory = props.params;

  const deals = [] as any;

  if (deals === undefined || deals.length === 0) {
    return (
      <>
        <section className="max-w-screen-lg  mx-auto flex flex-col justify-center items-center my-10 h-12 flex-nowrap sm:my-12">
          <h1 className="font-semibold capitalize  text-3xl m-3">
            {currentCategory.category}
          </h1>
          <p className="">Bald gibt es hier wieder tolle Angebote.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="max-w-screen-lg  mx-auto flex justify-center items-center my-10 h-12 flex-nowrap sm:my-12">
        <h1 className="font-semibold capitalize">{currentCategory.category}</h1>
      </section>

      <section className="max-w-screen-lg  mx-auto flex justify-center items-center my-10 h-12 flex-nowrap sm:my-12">
        <div>
          {deals.map((deal: any) => {
            return (
              <article key={`deal${deal.id}${deal.productName}`}>
                <div>
                  <Link href={deal.productUrl} passHref>
                    <Image
                      src={placeHolderImg}
                      alt="icon logout"
                      width="228"
                      height="230"
                    />
                  </Link>
                </div>
                <div>
                  {' '}
                  <p>{deal.productName}</p>
                </div>
                <div>
                  {' '}
                  <p>
                    <del>€ {deal.priceOld}</del>
                  </p>
                  <p>€ {deal.priceCurrent}</p>
                  <p>
                    <span>{deal.discount}</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Category;
