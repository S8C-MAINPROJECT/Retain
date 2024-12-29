import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./pages/Card/Card";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Signup/SignUp";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Define routes for different pages */}
        <Routes>
          {/* Route for Login Page */}
          <Route path="/" element={<Login />} />
          {/* Route for Home Page */}
          <Route path="/home" element={<Home />} />
          {/* Route for Card Page */}
          <Route path="/card" element={<Card />} />
          {/* Route for Signup Page */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import { Box, Card } from '@mui/material';
// <Box
//   sx={{
//     background: "#f3f3f3",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//   }}
// >
//   {/* <ProgressBar progress={progress} /> */}
//   <CardStack />
// </Box>
