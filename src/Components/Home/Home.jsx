import SearchBox from "../Search/SearchBox";
import Recomendation from "./Recomendation";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <section className="jumbotron">
        <SearchBox />
      </section>
      <Recomendation
        url="/comics?limit=40&orderBy=release_date DESC"
        label="Latest Comics"
        contentType="comics"
      />
      <Recomendation
        url="/characters?where=description NOT IN ('')&limit=40&orderBy=description"
        label="Popular Characters"
        contentType="characters"
      />
    </div>
  );
}

export default Home;
