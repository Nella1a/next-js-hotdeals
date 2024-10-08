import Image from 'next/image';
import Link from 'next/link';
import placeHolderImg from '../../../../../public/placeHolderImg.jpg';
import { ProductDetails } from '../page';
import { Shops } from './products';

const Product = ({ deal, shops }: { deal: ProductDetails; shops: Shops[] }) => {
  const shop = shops.find((cat: Shops) => cat.id === deal.shops_id);
  return (
    <Link href={deal.product_url} passHref>
      <article
        key={`deal${deal.id}${deal.title}`}
        className="border-[.5px] border-grey-600 grid grid-cols-[100px,_1fr]
      h-28 shadow-md
      "
      >
        <div className="flex flex-col justify-center items-center p-2">
          <Image src={placeHolderImg} alt="icon logout" width="150" />

          <div className="text-sm mt-[.2rem]">{shop?.name}</div>
        </div>
        <div className="border-l-[1px] flex flex-col gap-2 pt-2 pl-2">
          <p className="line-clamp-2 font-semibold text-sm sm:text-base">
            {deal.title}
          </p>
          <p className="grid gap-2 grid-cols-[60px,60px,50px]">
            <span className="text-gray-400">
              <del>€ {deal.old_price / 100}</del>
            </span>
            <span>€ {deal.current_price / 100}</span>
            <span className="text-center bg-yellow-200 rounded-sm">
              -{deal.discount}%
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
};
export default Product;
