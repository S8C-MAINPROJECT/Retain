import { useState } from "react";
import "./Card.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import EditBtn from "../../assets/editbtn.svg";
import DifficultyChooser from "../../components/DifficultyChooser/DifficultyChooser";
import Header from "../../components/Header/Header";

const db = [
  {
    country: "What is the capital of France?",
    capital: "The capital of France is Paris",
  },
  {
    country: "What is the capital of United States?",
    capital: "The capital of United States is Washington, D.C.",
  },
  {
    country: "What is the capital of India?",
    capital: "The capital of India is New Delhi",
  },
  {
    country: "What is the capital of Japan?",
    capital: "The capital of Japan is Tokyo",
  },
  {
    country: "What is the capital of Australia?",
    capital: "The capital of Australia is Canberra",
  },
];

const Card = () => {
  const [progress, setProgress] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState("");

  const handleNext = () => {
    setAnimation("slideOutLeft");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % db.length);
      setAnimation("slideInRight");
    }, 400);
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setAnimation("slideOutRight");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? db.length - 1 : prevIndex - 1
      );
      setAnimation("slideInLeft");
    }, 400);
    setShowAnswer(false);
  };

  const getCardData = (offset: number) => {
    const index = (currentIndex + offset + db.length) % db.length;
    return db[index];
  };

  return (
    <div className="central-card-component">
      <Header />
      <div className="pgBar-card">
        <ProgressBar progress={currentIndex + 1} total={db.length} activecolor="rgba(104,104,104,1)" deactivecolor="white"/>
      </div>
      <div className="cardContainer">
        <div className="cardStack">
          <div
            className={`card currentCard ${animation}`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="cardHeader">
              <p className="cardHeader-item">
                <span className="current-count">{currentIndex + 1}/</span><span className="total-count">{db.length}</span>
              </p>
              <img
                src={EditBtn}
                alt="Edit Button"
                id="editbtn"
                className="cardHeader-item"
              />
            </div>
            <h2 className="question">{getCardData(0).country}</h2>
            <div className="separator"></div>
            <div className="question">
              <p>
                {showAnswer ? (
                  <div className="answer">{getCardData(0).capital}</div>
                ) : (
                  <div className="reveal">Tap to reveal answer</div>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="navigation">
          <button onClick={handlePrev} className="navButton">
            Previous
          </button>
          <button onClick={handleNext} className="navButton">
            Next
          </button>
        </div>
      </div>
      <DifficultyChooser />
    </div>
  );
};

export default Card;
