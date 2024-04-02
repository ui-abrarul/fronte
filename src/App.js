import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import ViewPost from "./components/ViewPost/ViewPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts/:id" element={<ViewPost />} />
    </Routes>
  );
}

export default App;
