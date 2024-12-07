import React, { useState } from 'react';
import { Box, Card } from '@mui/material';
import CardStack from './components/Card/CardStack';
import DifficultyChooser from './components/DifficultyChooser/DifficultyChooser';
import ProgressBar from './components/ProgressBar/ProgressBar';

const App: React.FC = () => {
  // const [progress, setProgress] = useState(30); // Example progress

  return (
    <div className="App">
      {/* <ProgressBar progress={progress} /> */}
      <CardStack />
      <DifficultyChooser />
    </div>
  );
};

export default App;

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
