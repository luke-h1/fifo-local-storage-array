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
  search: async (query: string, pageNumber = 1) => {
    const response = await fetch(
      `http://localhost:4000/search?query=${query}&page=${pageNumber}`
    );
    const data = await response.json();
    return data as {
      data: SearchResponse[];
      status: string;
      paging: SearchResult["paging"];
    };
  },
};
export default searchService;
