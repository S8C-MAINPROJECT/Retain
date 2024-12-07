import React from 'react';
// import { Box, LinearProgress } from '@mui/material';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div>
      <div className='active-Progress'></div>
      <div className='active-Progress'></div>
      <div className='active-Progress'></div>
      <div className='deactive-Progress'></div>
      <div className='deactive-Progress'></div>
      <div className='deactive-Progress'></div>
      <div className='deactive-Progress'></div>
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