import router from 'next/router';
import { useState } from 'react';
import { sectionSearch } from './elements';

export default function Search() {
  const [search, setSearch] = useState('');

  return (
    <section css={sectionSearch}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await router.push(`/c/${search}`);
        }}
      >
        <select
          id="searchBar"
          name="searchbar"
          onChange={(event) => setSearch(event.currentTarget.value)}
        >
          <option value="0">Wähle deine Kategorie</option>
          <option value="wohnzimmer">Wohnzimmer</option>
          <option value="schlafzimmer">Schlafzimmer</option>
          <option value="speisezimmer">Speisezimmer</option>
          <option value="dekoration">Dekoration</option>
          <option value="arbeitszimmer">Arbeitszimmer</option>
          <option value="badezimmer">Badezimmer</option>
          <option value="garderobe">Garderobe</option>
          <option value="Kinderzimmer">Kinderzimmer</option>
        </select>
        <button>search</button>
      </form>
    </section>
  );
}
