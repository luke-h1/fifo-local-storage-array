export interface SearchResponse {
  title: string;
  url: string;
  description: string;
  userRole: never[];
}

export interface SearchResult {
  paging: {
    page: number;
    totalPages: number;
  };

  results: SearchResponse[];
}

const searchService = {
  search: async (query: string): Promise<SearchResult> => {
    const response = await fetch(`http://localhost:4000/search?query=${query}`);
    const data = await response.json();
    return data as SearchResult;
  },
};
export default searchService;
