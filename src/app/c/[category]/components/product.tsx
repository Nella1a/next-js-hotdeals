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

      "
    >
      <div className="border  border-cyan-800">
        <Link href={deal.product_url} passHref>
          <Image src={placeHolderImg} alt="icon logout" width="150" />
        </Link>
      </div>
      <div className="border-2">
        <p>{deal.title}</p>
        <div className="flex border-2 gap-2">
          <p>{shop?.name}</p>
          <p>
            <del>€ {deal.old_price / 100}</del>
          </p>
          <p>€{deal.current_price / 100}</p>
          <p>
            <span>{deal.discount}%</span>
          </p>
        </div>
      </div>
    </article>
  );
};
export default Product;
