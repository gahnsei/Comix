import { useNavigate } from "react-router";

function SearchBoxRes(props) {
  const { type, name, id } = props;
  const navigate = useNavigate();
  const isCharacter = type === `characters`;

  return (
    <div
      className="inputRes-div"
      onClick={
        isCharacter
          ? () => navigate(`/character/${id}`)
          : () => console.log(`hi`)
      }
    >
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
