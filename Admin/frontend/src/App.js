import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from "./pages/DashBoard";
import Stats from "./pages/Stats";
import Reports from "./pages/Reports";
import SupportChat from "./pages/SupportChat";
import Hotels from "./pages/Hotels";
import Navbar from "./components/Reusables/navbar/Navbar";
import './App.css'

const App = () => {
  return (
    <div className="app">
        <Router>
            <Navbar/>
        <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/supportChat" element={<SupportChat />} />
            <Route path="/hotels" element={<Hotels />} />
        </Routes>
        </Router>
    </div>
  );
};

export default App;
