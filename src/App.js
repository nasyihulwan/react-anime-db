import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import MainContent from "./components/MainContent.js";
import Sidebar from "./components/Sidebar.js";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");

  const GetTopAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/top/anime").then((res) =>
      res.json()
    );

    SetTopAnime(temp.data.slice(0, 5));
  };

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc`
    ).then((res) => res.json());

    console.log(temp);
    SetAnimeList(temp.data);
  };

  useEffect(() => {
    document.title = "Anime Database";
    GetTopAnime();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
