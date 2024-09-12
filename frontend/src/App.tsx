import { useState } from "react";
import Input from "./components/Input";
import searchService, { SearchResponse } from "./services/searchService";
import storageService from "./services/localStorageService";

function App() {
  const [text, setText] = useState("");

  const [searchItems, setSearchItems] = useState<SearchResponse[]>([]);

  const onSubmit = async () => {
    const { data, paging, status } = await searchService.search(text);

    setSearchItems(data.results);

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

      {/* <div>
        <pre>{JSON.stringify(results.length, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default App;
