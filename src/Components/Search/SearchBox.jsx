import { useState } from "react";
import useDataBase from "../../utils/useDataBase";
import { useNavigate } from "react-router";
import SearchBoxRes from "./SearchBoxRes";

function SearchBox() {
  const [input, setInput] = useState(``);
  const { dbRes: charData } = useDataBase(
    `/characters/search?q=${input}&limit=3`
  );
  const { dbRes: comicData } = useDataBase(`/comics/search?q=${input}&limit=3`);
  const navigate = useNavigate();

  const resetInput = () => {
    setInput(``);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetInput();
    navigate(`/search?q=${input}`);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search Comix"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <div className="inputRes">
        {input && [
          ...charData.map((ele) => <SearchBoxRes {...ele} type="characters" />),
          ...comicData.map((ele) => <SearchBoxRes {...ele} type="comics" />)
        ]}
      </div>
    </form>
  );
}

export default SearchBox;
