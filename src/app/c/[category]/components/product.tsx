import Image from 'next/image';
import Link from 'next/link';
import placeHolderImg from '../../../../../public/placeHolderImg.jpg';
import { ProductDetails } from '../page';
import { Shops } from './products';

const Product = ({ deal, shops }: { deal: ProductDetails; shops: Shops[] }) => {
  const shop = shops.find((cat: Shops) => cat.id === deal.shop_id);
  return (
    <Link href={deal.product_url} passHref target="_blank">
      <article
        key={`deal${deal.id}${deal.title}`}
        className="border-[.5px] border-grey-600 grid grid-cols-[100px,_1fr]
      h-28 relative bg-white hover:border-[1px] hover:border-yellow-200"
      >
        <div className="flex flex-col items-center p-2">
          <Image src={placeHolderImg} alt="icon logout" width="150" />
          <div className="text-sm mt-[.2rem]">{shop?.name}</div>
        </div>
        <div className="border-l-[1px] flex flex-col gap-2 p-2">
          <p className="line-clamp-2 font-semibold text-sm sm:text-base">
            {deal.title}
          </p>
          <div className="grid grid-cols-[90px,80px] ">
            <p>
              <span className="text-gray-400 text-xs">
                {deal.uvp
                  ? `UVP € ${deal.old_price / 100}`
                  : `statt € ${deal.old_price / 100}`}
              </span>
            </p>

            <span>€ {deal.current_price / 100}</span>
            <span className="text-center bg-yellow-200 rounded-sm absolute bottom-0 right-0 px-[8px]">
              -{deal.discount}%
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default Product;
