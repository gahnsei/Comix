import { useSearchParams } from "react-router-dom";
import Card from "../Cards/Card";
import useCardManagement from "../../utils/useCardManagement";
import useDataBase from "../../utils/useDataBase";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(`q`);
  const { dbRes: charData } = useDataBase(`/characters/search?q=${query}`);
  const { dbRes: comicData } = useDataBase(`/comics/search?q=${query}`);

  const {
    mouseEventHandler: characterEventHandler,
    mouseEvent: characterEvent
  } = useCardManagement(`characters`);

  const { mouseEventHandler: comicEventHandler, mouseEvent: comicEvent } =
    useCardManagement(`comic`);

  return (
    <section className="section search-section">
      <div className="search-banner">
        SHOWING RESULTS FOR | {query.toUpperCase()}
      </div>
      <div className="search-results">
        {charData.map((ele) => (
          <Card
            type="characters"
            key={ele.id}
            {...ele}
            handleEvent={characterEventHandler}
            isHovered={characterEvent.hover && characterEvent.id === ele.id}
            isClicked={characterEvent.click && characterEvent.id === ele.id}
          />
        ))}
        {comicData.map((ele) => (
          <Card
            type="comics"
            key={ele.id}
            {...ele}
            handleEvent={comicEventHandler}
            isHovered={comicEvent.hover && comicEvent.id === ele.id}
            isClicked={comicEvent.click && comicEvent.id === ele.id}
          />
        ))}
      </div>
    </section>
  );
}

export default Search;
