import { useNavigate } from "react-router";

function SearchBoxRes(props) {
  const { type, name, id, resetNavDrawer } = props;
  const navigate = useNavigate();
  const isCharacter = type === `characters`;

  const handleClick = () => {
    if (resetNavDrawer) resetNavDrawer();
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="inputRes-div" onClick={handleClick}>
      {isCharacter ? (
        <i className="fa-solid fa-mask"></i>
      ) : (
        <i className="fa-solid fa-book-open"></i>
      )}
      <span>{name}</span>
    </div>
  );
}

export default SearchBoxRes;
