import Card from "../Cards/Card";
import Loading from "../General/Loading";

import useCardManagement from "../../utils/useCardManagement";
import useDataBase from "../../utils/useDataBase";

import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(`q`);
  const { dbRes: charData, loading: charLoading } = useDataBase(
    `/characters/search?q=${query}`
  );
  const { dbRes: comicData, loading: comicLoading } = useDataBase(
    `/comics/search?q=${query}`
  );

  const {
    mouseEventHandler: characterEventHandler,
    mouseEvent: characterEvent
  } = useCardManagement(`characters`);

  const { mouseEventHandler: comicEventHandler, mouseEvent: comicEvent } =
    useCardManagement(`comics`);

  return (
    <div className="section search-section">
      <section className="search-banner">
        SHOWING RESULTS FOR | {query.toUpperCase()}
      </section>
      <section className="search-results">
        {charLoading && comicLoading ? (
          <Loading />
        ) : (
          <>
            {charData.map((ele) => (
              <Card
                contentType="characters"
                key={ele.marvel_id}
                {...ele}
                handleEvent={characterEventHandler}
                isHovered={characterEvent.hover && characterEvent.id === ele.id}
                isClicked={characterEvent.click && characterEvent.id === ele.id}
              />
            ))}
            {comicData.map((ele) => (
              <Card
                contentType="comics"
                key={ele.marvel_id}
                {...ele}
                handleEvent={comicEventHandler}
                isHovered={comicEvent.hover && comicEvent.id === ele.id}
                isClicked={comicEvent.click && comicEvent.id === ele.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}

export default Search;
