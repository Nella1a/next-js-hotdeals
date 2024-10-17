'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!params.category) setSearch('');
  }, [params.category]);

  return (
    <section className="flex justify-center items-center bg-[#333] p-3.5">
      <form
        className="flex justify-center items-center h-full mx-7"
        onSubmit={async (event) => {
          event.preventDefault();
          if (search) {
            router.push(`/c/${search}`);
          } else {
            router.push(`/`);
          }
        }}
      >
        <select
          className="min-h-14 p-4 text-left mb-0 sm:w-96 focus:outline-none focus-visible:ring "
          id="searchBar"
          name="searchbar"
          onChange={(event) => setSearch(event.currentTarget.value)}
          value={search}
        >
          <option value="">Wähle eine Kategorie</option>
          <option value="wohnzimmer">Wohnzimmer</option>
          <option value="schlafzimmer">Schlafzimmer</option>
          <option value="badezimmer">Badezimmer</option>
        </select>
        <button className="min-h-14 bg-slate-200 px-2 font-bold tracking-wider inline-block leading-6  hover:bg-[#e20015] hover:text-white">
          search
        </button>
      </form>
    </section>
  );
}
