import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from "./pages/DashBoard";
import Stats from "./pages/Stats";
import Reports from "./pages/Reports";
import SupportChat from "./pages/SupportChat";
import Hotels from "./pages/Hotels";
import Navbar from "./components/Reusables/navbar/Navbar";
import './App.css'
import Login from "./pages/Login";
import {useAuth} from './utils/useAuthClient'
import { AuthProvider } from "./utils/useAuthClient";

const App = () => {
  const [loggedIn,setLoggedIn]=useState(localStorage.getItem("loggedIn")||false)
  // const {isAuthenticated}=useAuth()
  return (
    <AuthProvider setLoggedIn={setLoggedIn}>
    <div className="app">
      {/* {
        loggedIn? */}
        <Router>

            <Navbar/>
        <Routes>
            <Route path="/" element={<Reports />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/supportChat" element={<SupportChat />} />
            <Route path="/hotels" element={<Hotels />} />
        </Routes>
        </Router>
        {/* :
        <Login setLoggedIn={setLoggedIn}/>
      } */}
        
    </div>
    </AuthProvider>
  );
};

export default App;
