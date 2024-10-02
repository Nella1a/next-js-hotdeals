import Image from 'next/image';
import Link from 'next/link';
import placeHolderImg from '../../../../public/placeHolderImg.jpg';
import { ProductDetails } from './page';

const Products = ({ deals }: { deals: ProductDetails[] }) => (
  <div className="grid grid-cols-4">
    {deals.map((deal) => (
      <article key={`deal${deal.id}${deal.title}`}>
        <div>
          <Link href={deal.product_url} passHref>
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
          <p>{deal.title}</p>
        </div>
        <div className="flex gap-4">
          {' '}
          <p>
            <del>€ {deal.old_price / 100}</del>
          </p>
          <p>€{deal.current_price / 100}</p>
          <p>
            <span>{deal.discount}%</span>
          </p>
        </div>
      </article>
    ))}
  </div>
);

export default Products;
