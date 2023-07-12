import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/Home.tsx";
import Favorites from "./pages/Favorites.tsx";
import Add from "./pages/Add.tsx";
import { Route, Routes } from "react-router-dom";
import React from "react";

import "dotenv/config";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
