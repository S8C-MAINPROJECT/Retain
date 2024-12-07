import React from 'react';
// import { Box, LinearProgress } from '@mui/material';
// import './ProgressBar.css';

interface ProgressBarProps {
  progress: number; // Progress is a number (e.g., 0 to 5)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, gap: 5, marginBottom: 30 }}>
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            style={{
              height: '5px',
              width: '25px',
              borderRadius: '25px',
              backgroundColor: index < progress ? 'rgba(104,104,104,1)' : 'white', // Active bars are white
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;


{/* <Box sx={{ width: "100%", marginBottom: "20px" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          backgroundColor: "#f3f3f3",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#ff7043",
          },
        }}
      />
    </Box> */}

    {/* <div className='progressBar'>
        <div className='active-Progress'></div>
        <div className='active-Progress'></div>
        <div className='active-Progress'></div>
        <div className='deactive-Progress'></div>
        <div className='deactive-Progress'></div>
        <div className='deactive-Progress'></div>
        <div className='deactive-Progress'></div>
      </div> */}