import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";

import './App.css';

import Home from './pages/Home';
import List from './pages/List';
import Pokemon from './pages/Pokemon';


function App() {
  
  return (
    <>
       <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/List' element={<List />} />
        <Route path='/Pokemon' element={<Pokemon />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
