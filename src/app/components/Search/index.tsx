'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleOnChange = (event: any) => {
    const option = event.currentTarget.value;
    if (option) router.push(`/c/${option}`);
  };

  return (
    <section className="flex justify-center items-center bg-[#333] p-3.5">
      <select
        className="min-h-14 p-4 text-left mb-0 sm:w-96 focus:outline-none focus-visible:ring "
        id="searchBar"
        name="searchbar"
        onChange={(event) => handleOnChange(event)}
        value={search}
      >
        <option value="">Wähle eine Kategorie</option>
        <option value="wohnzimmer">Wohnzimmer</option>
        <option value="schlafzimmer">Schlafzimmer</option>
        <option value="badezimmer">Badezimmer</option>
      </select>
    </section>
  );
}
