import React from "react";

function UserNav(props) {
  const { profileActive, favCharactersActive, favComicsActive, setInfoType } =
    props;
  return (
    <div className="user-nav">
      <span
        className={`user-nav-link ${profileActive && `user-active-nav-link`}`}
        onClick={() => setInfoType(`profile`)}
      >
        PROFILE
      </span>
      <span
        className={`user-nav-link ${favComicsActive && `user-active-nav-link`}`}
        onClick={() => setInfoType(`favComics`)}
      >
        FAVORITE COMICS
      </span>
      <span
        className={`user-nav-link ${
          favCharactersActive && `user-active-nav-link`
        }`}
        onClick={() => setInfoType(`favCharacters`)}
      >
        FAVORITE CHARACTERS
      </span>
    </div>
  );
}

export default UserNav;
