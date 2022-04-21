import { Routes, Route } from "react-router";
import UserContext from "./utils/UserContext";
import Home from "./Components/Home/Home";
import Header from "./Components/General/Header";
import Catalogue from "./Components/Catalogue/Catalogue";
import Content from "./Components/ContentPage/Content";
import Search from "./Components/Search/Search";
import MyAccount from "./Components/MyAccount/MyAccount";
import Footer from "./Components/General/Footer";

function App() {
  return (
    <UserContext>
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
    </UserContext>
  );
}

export default App;
