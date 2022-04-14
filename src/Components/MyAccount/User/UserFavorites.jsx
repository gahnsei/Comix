import useDataBase from "../../../utils/useDataBase";

function UserFavorites(props) {
  const { type, userId } = props;
  const { dbRes: data } = useDataBase(`/user/${type}?userId=${userId}`);
  return (
    <>
      <h1>FAVORITE {type.toUpperCase()}</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default UserFavorites;
