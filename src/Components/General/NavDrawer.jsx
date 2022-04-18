import SearchBox from "../Search/SearchBox";
import { NavLink } from "react-router-dom";

function NavDrawer(props) {
  const { windowWidth, resetNavDrawer } = props;
  return (
    <div className="nav-drawer">
      {windowWidth <= 576 && (
        <ol className="nav-drawer-list">
          <li onClick={resetNavDrawer}>
            <NavLink to="/comics">COMICS</NavLink>
          </li>
          <li onClick={resetNavDrawer}>
            <NavLink to="/characters">CHARACTERS</NavLink>
          </li>
          <li onClick={resetNavDrawer}>
            <NavLink to="myaccount">MY ACCOUNT</NavLink>
          </li>
        </ol>
      )}
      <SearchBox resetNavDrawer={resetNavDrawer} />
    </div>
  );
}

export default NavDrawer;
