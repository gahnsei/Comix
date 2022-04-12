import { useParams } from "react-router";
import CharacterInfo from "./CharacterInfo";
import useDataBase from "../../utils/useDataBase";

function Character() {
  const { id } = useParams();
  const { dbRes } = useDataBase(`/characters?id=${id}`);
  const character = dbRes[0] || {};
  const { name, image, description } = character;
  const favorite = true;
  return (
    <>
      <img src={image} alt={name} className="character-image" />
      <CharacterInfo name={name} description={description} />
    </>
  );
}

export default Character;
