import React from "react";
import "./DifficultyChooser.css";

interface DifficultyChooserProps {
  onDifficultySelect: (difficulty: number) => void; // Accepts a function
}

const DifficultyChooser: React.FC<DifficultyChooserProps> = ({
  onDifficultySelect,
}) => {
  return (
    <div className="difficulty-chooser">
      <h2>Select your difficulty level here</h2>
      <div className="difficulty-options">
        <div
          className="difficulty-option"
          onClick={() => onDifficultySelect(1)}
        >
          <span role="img" aria-label="Again">
            😢
          </span>
          <p>Again</p>
          <p>15 min</p>
        </div>
        <div
          className="difficulty-option"
          onClick={() => onDifficultySelect(2)}
        >
          <span role="img" aria-label="Hard">
            😥
          </span>
          <p>Hard</p>
          <p>15 min</p>
        </div>
        <div
          className="difficulty-option selected"
          onClick={() => onDifficultySelect(3)}
        >
          <span role="img" aria-label="Good">
            😊
          </span>
          <p>Good</p>
          <p>1 day</p>
        </div>
        <div
          className="difficulty-option"
          onClick={() => onDifficultySelect(4)}
        >
          <span role="img" aria-label="Easy">
            😌
          </span>
          <p>Easy</p>
          <p>4 days</p>
        </div>
      </div>
    </div>
  );
};

export default DifficultyChooser;
