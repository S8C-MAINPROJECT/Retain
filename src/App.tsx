import React, { useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import DifficultyChooser from './components/DifficultyChooser/DifficultyChooser';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const [progress, setProgress] = useState(2); // Example progress

  return (
    <div className="App">
      <Header />
      <ProgressBar progress={progress} />
      <Card />
      <DifficultyChooser />
    </div>
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
