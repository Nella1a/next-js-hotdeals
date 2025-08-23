import SearchResult from './components/SearchResult';

export type SearchParams = { [key: string]: string | string[] };

const SearchResultPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchTerms = await props.searchParams;

  const query = searchTerms['q'] ?? '';
  const keywords = Array.isArray(query) ? query.join(' ') : query;
  return (
    <>
      <SearchResult searchParams={new URLSearchParams(searchTerms as any)} />
    </>
  );
};

export default SearchResultPage;
