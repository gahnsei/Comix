import useWindowWidth from "../../utils/useWindowWidth";
import { useState } from "react";
import logo from "../../logo.png";
import { NavLink } from "react-router-dom";
import SearchBox from "../Search/SearchBox";
import NavDrawer from "./NavDrawer";

function Header() {
  const windowWidth = useWindowWidth();
  const [openNav, setOpenNav] = useState(false);

  const toggleDrawer = () => {
    setOpenNav((prevState) => !prevState);
  };

  const resetNavDrawer = () => {
    setOpenNav(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/">
          <div className="logo">
            <img src={logo} alt="COMIX" />
            <span>COMIX</span>
          </div>
        </NavLink>
        {windowWidth <= 576 ? (
          <i
            id="nav-hamburger"
            className="fa-solid fa-bars primary-color-text"
            onClick={toggleDrawer}
          ></i>
        ) : (
          <>
            <ol>
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
            {windowWidth <= 768 ? (
              <i
                id="nav-hamburger"
                className="fa-solid fa-bars primary-color-text"
                onClick={toggleDrawer}
              ></i>
            ) : (
              <SearchBox />
            )}
          </>
        )}
      </nav>
      {openNav && windowWidth <= 768 && (
        <NavDrawer windowWidth={windowWidth} resetNavDrawer={resetNavDrawer} />
      )}
    </header>
  );
}

export default Header;
