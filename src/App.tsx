import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./pages/Card/Card";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Signup/SignUp";
import ViewDeck from "./components/ViewDeck/ViewDeck";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Summarizer from "./components/Summarizer/Summarizer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes - Only accessible after login */}
          <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/deck" element={<ViewDeck />} />
          <Route path="/test" element={<Summarizer />} />
          </Route>
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

{
  /* <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/test" element={<ViewDeck />} />
        </Routes>
      </div>
</Router> */
}
