import "./DifficultyChooser.css";

interface DifficultyChooserProps {
  handleNext: () => void; // The type of the handleNext function
}

const DifficultyChooser: React.FC<DifficultyChooserProps> = ({
  handleNext,
}) => {
  return (
    <div>
      <div className="difficultyOptions">
        <button className="difficultyBtn hard" onClick={() => handleNext()}>
          <span className="difficultyTime">15 min</span>
          <br></br>
          <span className="difficultyMeasure">Again</span>
        </button>
        <button className="difficultyBtn medium" onClick={() => handleNext()}>
          <span className="difficultyTime">4 day</span>
          <br></br>
          <span className="difficultyMeasure">Easy</span>
        </button>
        <button className="difficultyBtn easy" onClick={() => handleNext()}>
          <span className="difficultyTime">1 day</span>
          <br></br>
          <span className="difficultyMeasure">Good</span>
        </button>
      </div>
    </div>
  );
};

export default DifficultyChooser;
