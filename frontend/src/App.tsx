import { useState } from "react";
import Input from "./components/Input";
import searchService, { SearchResponse } from "./services/searchService";
import storageService from "./services/localStorageService";

function App() {
  const [text, setText] = useState("");
  const [totalPages, setTotalPages] = useState<number[]>([]);

  const [searchItems, setSearchItems] = useState<SearchResponse[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);

  const onSubmit = async (pageNum?: number) => {
    const { data, paging } = await searchService.search(text, pageNum);

    // setTotalPages([...totalPages]);

    // paging.totalPages is a number of total pages
    // turn it into an array of numbers
    const tp = Array.from({ length: paging.totalPages }, (_, i) => i + 1);

    setCurrPage(paging.page);
    setTotalPages(tp);
    setSearchItems(data);

    const history = storageService.getSync<string[]>("history") || [];

    if (history.length >= 5) {
      history.splice(0, 1);
      storageService.setSync("history", history);
    }

    storageService.setSync("history", [...history, text]);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <button onClick={() => onSubmit()}>Submit</button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <ul
          style={{ maxHeight: "500px", overflowY: "auto", marginTop: "2rem" }}
        >
          {searchItems && searchItems.map((item) => <li>{item.title}</li>)}
        </ul>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div style={{ display: "flex", flexDirection: "row" }}>
        {totalPages.map((page) => (
          <button
            onClick={() => onSubmit(page)}
            style={{
              margin: "0.5rem",
              color: page === currPage ? "red" : "black",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* <div>
        <pre>{JSON.stringify(results.length, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default App;
