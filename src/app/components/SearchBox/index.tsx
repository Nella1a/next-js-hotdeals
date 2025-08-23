'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MagnifyingGlass from '../Icons/magnifyingGlass';
import XMark from '../Icons/xmark';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const onSearchTermHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    setSearchTerm(searchTerm);
  };

  const onSearchHandler = () => {
    const url = `/c/search/?q=${encodeURIComponent(searchTerm)}`;

    if (searchTerm) {
      router.push(url);
    }
  };

  return (
    <div
      className={`w-full border border-grey-250 bg-white h-12 md:h-11 flex items-center justify-center rounded px-2 hover:border-[1.5px]`}
    >
      <button
        className="min-w-8 flex items-center justify-center cursor-pointer"
        onClick={onSearchHandler}
      >
        <MagnifyingGlass />
      </button>

      <input
        type="text"
        id="searchField"
        onChange={(event) => onSearchTermHandler(event)}
        name="SearchField"
        value={searchTerm}
        placeholder="Suchbegriff eingeben"
        onKeyDown={(event) => event.key === 'Enter' && onSearchHandler()}
        className="w-full py-1 px-0.5 mx-1 focus:outline-none"
      />
      {searchTerm && (
        <button
          className="min-w-6 border rounded-2xl cursor-pointer hover:border-2"
          onClick={() => setSearchTerm('')}
        >
          <XMark />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
