import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NavBar } from "./components/NavBar";
import CoinInfo from "./Pages/CoinInfo";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="coin/:id" element={<CoinInfo />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
