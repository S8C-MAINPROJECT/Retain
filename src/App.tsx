import React from 'react';
import './App.css';
import Card from './components/Card/Card';
import DifficultyChooser from './components/DifficultyChooser/DifficultyChooser';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
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
