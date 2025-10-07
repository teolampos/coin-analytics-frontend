import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Homepage</div>} />
        <Route path="/coin" element={<div>Coin Analytics</div>} />
      </Routes>
    </>
  );
};

export default App;
