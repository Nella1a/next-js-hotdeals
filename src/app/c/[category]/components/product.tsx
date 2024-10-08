import Image from 'next/image';
import Link from 'next/link';
import placeHolderImg from '../../../../../public/placeHolderImg.jpg';
import { ProductDetails } from '../page';
import { Shops } from './products';

const Product = ({ deal, shops }: { deal: ProductDetails; shops: Shops[] }) => {
  const shop = shops.find((cat: Shops) => cat.id === deal.shops_id);
  return (
    <article
      key={`deal${deal.id}${deal.title}`}
      className="border-2 border-red-600 grid grid-cols-[100px,_1fr] gap-2
      h-28
      "
    >
      <div className="border  border-cyan-800">
        <Link href={deal.product_url} passHref>
          <Image src={placeHolderImg} alt="icon logout" width="150" />
        </Link>
        <div>{shop?.name}</div>
      </div>
      <div className="border-2 flex flex-col gap-2">
        <p className="line-clamp-2">{deal.title}</p>
        <p className="grid gap-2 grid-cols-[60px,60px,50px]">
          <span>
            <del>€ {deal.old_price / 100}</del>
          </span>
          <span>€ {deal.current_price / 100}</span>
          <span className="text-center bg-yellow-200 rounded-sm">
            {deal.discount}%
          </span>
        </p>
      </div>
    </article>
  );
};
export default Product;
