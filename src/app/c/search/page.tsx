import { Suspense } from 'react';
import SearchResult from './components/SearchResult';

export type SearchParams = { [key: string]: string | string[] };
const Loading = () => {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className='h-12 text-2xl flex items-center font-semibold"'>
        Loading...
      </h1>
    </div>
  );
};

const SearchResultPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchTerms = await props.searchParams;
  const query = searchTerms['q'] ?? '';
  const keywords = Array.isArray(query) ? query.join(' ') : query;

  return (
    <Suspense fallback={<Loading />} key={keywords}>
      <SearchResult searchParams={new URLSearchParams(searchTerms as any)} />
    </Suspense>
  );
};

export default SearchResultPage;
