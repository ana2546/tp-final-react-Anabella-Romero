import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";

import Home from "./pages/Home";
import List from "./pages/ListaPokemones";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <>
      <div className=" min-vh-100">
        <Navbar />
        <div className="container mt-4"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ListaPokemones" element={<List />} />
          <Route path="/Pokemon/:nombre" element={<Pokemon />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route
            path="/pokemon"
            element={<Navigate to="/pokemon/pikachu" replace />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
