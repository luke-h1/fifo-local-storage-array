import { useState } from "react";
import Input from "./components/Input";
import searchService, { SearchResponse } from "./services/searchService";
import storageService from "./services/localStorageService";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const [searchItems, setSearchItems] = useState<SearchResponse[]>([]);

  const onSubmit = async () => {
    const { paging, results } = await searchService.search(text);

    const history = storageService.getSync<string[]>("history") || [];

    if (history.length >= 5) {
      history.splice(0, 1);
      storageService.setSync("history", history);
    }

    console.log("history", history);

    storageService.setSync("history", [...history, text]);

    setSearchItems(results);
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
