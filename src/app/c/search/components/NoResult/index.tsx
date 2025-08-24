const NoSearchResult = ({ searchTerm }: { searchTerm: string }) => (
  <h1 className="h-12 text-lg flex items-center font-normal my-10 sm:my-12">
    Für deine Suche &apos;{searchTerm}&apos; wurden leider keine passenden
    Treffer gefunden - versuche einen anderen Suchbegriff!
  </h1>
);
export default NoSearchResult;
