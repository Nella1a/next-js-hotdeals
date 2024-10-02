'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  return (
    <section className="flex justify-center items-center bg-[#333] p-3.5">
      <form
        className="flex justify-center items-center h-full mx-7"
        onSubmit={async (event) => {
          event.preventDefault();
          router.push(`/c/${search}`);
        }}
      >
        <select
          className="min-h-14 p-4 text-left mb-0 sm:w-96"
          id="searchBar"
          name="searchbar"
          onChange={(event) => setSearch(event.currentTarget.value)}
        >
          <option value="0">Wähle eine Kategorie</option>
          <option value="wohnzimmer">Wohnzimmer</option>
          <option value="schlafzimmer">Schlafzimmer</option>
          <option value="badezimmer">Badezimmer</option>
        </select>
        <button className="min-h-14 bg-slate-200 px-1.5 font-bold tracking-wider inline-block leading-6  hover:bg-[#e20015] hover:text-white">
          search
        </button>
      </form>
    </section>
  );
}
