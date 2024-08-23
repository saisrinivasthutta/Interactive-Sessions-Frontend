import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Student from "./components/Student";
import Mentor from "./components/Mentor";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/student" element={<Student />} />
        <Route exact path="/mentor" element={<Mentor />} />
      </Routes>
    </Router>
  );
}

export default App;
