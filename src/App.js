import React from "react";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Memebers from "./Members";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBarComp from "./components/NavBarComp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarComp />
        <div className="wrapper">
          <Routes>
            {/* <Route path="/" component={Home} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={<Memebers />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
