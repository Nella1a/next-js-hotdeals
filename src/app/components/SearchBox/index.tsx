'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MagnifyingGlass from '../Icons/magnifyingGlass';
import XMark from '../Icons/xmark';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState(false);
  const router = useRouter();
  const onSearchTermHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    setSearchTerm(searchTerm);
  };

  const onSearchHandler = () => {
    const url = `/c/search/?q=${encodeURIComponent(searchTerm)}`;

    if (searchTerm) {
      //setSearch(false);
      //setSearchTerm('');
      console.log('URL-ENCODED: ', url);
      router.push(url);
    }
  };

  return (
    <div
      className={`w-full border border-grey-250 bg-white h-12 md:h-11 flex items-center justify-center rounded px-2`}
    >
      <button
        className="min-w-8 flex items-center justify-center"
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
        placeholder="Suche"
        className="w-full py-1 px-0.5 mx-1"
      />
      {searchTerm && (
        <button
          className="min-w-6 border rounded-2xl"
          onClick={() => setSearchTerm('')}
        >
          <XMark />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
