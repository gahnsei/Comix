import { Routes, Route } from "react-router";
import Home from "./Components/Home/Home";
import Header from "./Components/General/Header";
import Catalogue from "./Components/Catalogue/Catalogue";
import Character from "./Components/Character/Character";
import Search from "./Components/Search/Search";
import MyAccount from "./Components/MyAccount/MyAccount";
import Footer from "./Components/General/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:contentType" element={<Catalogue />} />
        <Route path="/:contentType/:id" element={<Character />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myaccount/*" element={<MyAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
