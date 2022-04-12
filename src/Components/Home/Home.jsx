import SearchBox from "../Search/SearchBox";
import Recomendation from "./Recomendation";

function Home() {
  return (
    <>
      <div className="jumbotron">
        <SearchBox />
      </div>
      <Recomendation
        url="/comics?limit=6&orderBy=release_date DESC"
        label="Latest Comics"
        type="comics"
      />
      <Recomendation
        url="/characters?limit=6&orderBy=marvel_id"
        label="Popular Characters"
        type="characters"
      />
    </>
  );
}

export default Home;
