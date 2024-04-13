// import logo from './logo.svg';
import React from "react";
import Landing from "./pages/Landing"

import './App.css';
import { Routes, Route, Link, Router, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
