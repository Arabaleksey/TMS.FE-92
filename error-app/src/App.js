import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [value] = useState("");
  const [data, setData] = useState(null);

  const fetchPosts = () => {
    const { data } = axios.get("https://studapi.teachmeskills.by/blog/posts/");

    setData(data.results);
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <form>
        <h1>Value: {value}</h1>
        <input value={value} />
      </form>

      <div>
        {data.map((item) => {
          return (
            <>
              <img src={item.image} alt={item.title} />
              <div>{item.title}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
