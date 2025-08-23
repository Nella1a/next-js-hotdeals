'use client';

import { useState } from 'react';
import MagnifyingGlass from '../Icons/magnifyingGlass';
import XMark from '../Icons/xmark';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  };

  return (
    <div
      className={`w-full relative border border-grey-250 bg-white h-12 md:h-11 flex items-center justify-center rounded px-2`}
    >
      <span className="min-w-8 flex items-center justify-center">
        <MagnifyingGlass />
      </span>

      <input
        type="text"
        id="searchField"
        onChange={(event) => handleSearch(event)}
        name="SearchField"
        value={searchTerm}
        className="border-2 w-full py-1 px-0.5"
      />
      {searchTerm && (
        <button
          className="min-w-6 border rounded-2xl"
          // onClick={}
        >
          <XMark />
        </button>
      )}
      <button></button>
    </div>
  );
};

export default SearchBox;
