import React from 'react';
interface ProgressBarProps {
  progress: number; // Progress is a number (e.g., 0 to 5)
  total: number;
  activecolor: string;
  deactivecolor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, activecolor, deactivecolor }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, margin:2}}>
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            style={{
              height: '5px',
              width: '25px',
              borderRadius: '25px',
              backgroundColor: index < progress ? activecolor : deactivecolor, // Active bars are white
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
