import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";

import Home from "./pages/Home";
import List from "./pages/ListaPokemones";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListaPokemones" element={<List />} />
        <Route path="/Pokemon/:nombre" element={<Pokemon />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
