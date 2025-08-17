import Link from 'next/link';
import { ProductDetails } from '../page';
import { Shops } from './products';

const formatPrice = (price: number) => {
  const euros = Math.floor(price / 100);
  const cents = price % 100;
  const formattedCents = cents === 0 ? '‒' : cents.toString().padStart(2, '0');
  return (
    <span>
      {euros},{formattedCents}
    </span>
  );
};

const Product = ({ deal, shops }: { deal: ProductDetails; shops: Shops[] }) => {
  const shop = shops.find((cat: Shops) => cat.id === deal.shop_id);
  return (
    <Link href={deal.product_url} passHref target="_blank">
      <article
        key={`deal${deal.id}${deal.title}`}
        className="border-[.5px] shadow-xs rounded-md border-gray-300 grid grid-cols-[80px,_1fr]
      h-28 relative bg-white hover:border-[1px] hover:border-yellow-300 px-4"
      >
        <div className="flex justify-center items-center pb-1">
          <div className="text-sm">{shop?.name}</div>
        </div>
        <div className="flex flex-col">
          <p className="line-clamp-1 font-semibold text-sm sm:text-base pb-1">
            {deal.title}
          </p>
          <div className="grid grid-cols-[90px,80px] ">
            <p className="text-gray-400 text-xs">
              {deal.uvp ? 'UVP €' : 'statt €'} {formatPrice(deal.old_price)}
            </p>
            <p>€ {formatPrice(deal.current_price)}</p>

            <span className="text-center bg-yellow-200 rounded-sm absolute bottom-0 right-0 px-[8px] ">
              -{deal.discount}%
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default Product;
