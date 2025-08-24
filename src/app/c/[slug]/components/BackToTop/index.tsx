'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ChevronUp from '../../../../components/Icons/chevronUp';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link
      href="#headerSection"
      className={`bg-black block fixed right-1/11 bottom-4 rounded-full ${
        isVisible ? 'opacity-100 z-50' : 'opacity-0 -z-50'
      }
            w-[3rem] h-[2.5rem]`}
    >
      <div className="text-xs h-full flex justify-center items-center gap-2 text-white">
        <div className="w-6">
          <ChevronUp />
        </div>
      </div>
    </Link>
  );
};

export default BackToTop;
