import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useHandleUser } from "./utils/UserContext";
import useDataBase from "./utils/useDataBase";
import Home from "./Components/Home/Home";
import Header from "./Components/General/Header";
import Catalogue from "./Components/Catalogue/Catalogue";
import Content from "./Components/ContentPage/Content";
import Search from "./Components/Search/Search";
import MyAccount from "./Components/MyAccount/MyAccount";
import Footer from "./Components/General/Footer";

import axios from "axios";

function App() {
  const allCookies = document.cookie;
  const { loginUser } = useHandleUser();
  const { getFavCharacters, getFavComics } = useDataBase();

  useEffect(() => {
    if (allCookies.includes(`qazxswedc`)) {
      console.log(allCookies);
      let cookie = allCookies.split(`=`);
      cookie = cookie[1].split(`*`);
      axios
        .get(`http://localhost:4444/user/saved?userId=${cookie[0]}`)
        .then((res) => {
          loginUser({ ...res.data[0], password: cookie[1] });
          getFavCharacters(res.data[0].id);
          getFavComics(res.data[0].id);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:contentType" element={<Catalogue />} />
          <Route path="/:contentType/:id" element={<Content />} />
          <Route path="/search" element={<Search />} />
          <Route path="/myaccount/*" element={<MyAccount />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
