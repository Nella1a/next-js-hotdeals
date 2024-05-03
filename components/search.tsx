import router from 'next/router';
import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');

  return (
    <section className="flex justify-center items-center bg-[#333] p-3.5">
      <form
        className="flex justify-center items-center h-full mx-7 "
        onSubmit={async (event) => {
          event.preventDefault();
          await router.push(`/c/${search}`);
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
          <option value="speisezimmer">Speisezimmer</option>
          <option value="dekoration">Dekoration</option>
          <option value="arbeitszimmer">Arbeitszimmer</option>
          <option value="badezimmer">Badezimmer</option>
          <option value="garderobe">Garderobe</option>
          <option value="Kinderzimmer">Kinderzimmer</option>
        </select>
        <button className="min-h-14 bg-slate-200 px-1.5 font-bold tracking-wider inline-block leading-6  hover:bg-[#e20015] hover:text-white">
          search
        </button>
      </form>
    </section>
  );
}
