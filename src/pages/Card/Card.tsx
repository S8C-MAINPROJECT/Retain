// src/pages/Card/Card.tsx
import { useState, useEffect } from "react";
import "./Card.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import icons from "../../assets/icons";
import DifficultyChooser from "../../components/DifficultyChooser/DifficultyChooser";
import { useLocation, useNavigate } from "react-router-dom";

const Card = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let deckTitle = params.get("deckTitle");
  if (deckTitle) {
    deckTitle = decodeURIComponent(deckTitle);
  }
  const navigate = useNavigate();
  const [progress, setProgress] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState("");
  const [db, setDb] = useState<Array<{ question: string; answer: string }>>([
    { question: "Loading...", answer: "Please wait." },
  ]);
  // Define type for db state

  useEffect(() => {
    console.log("Deck Title in Card:", deckTitle);
    let dataFile = null;

    // Determine the JSON file to load based on deckTitle
    if (deckTitle === "Capital Countries") {
      dataFile = import("../../data/capital-countries.json");
    } else if (deckTitle === "English Vocabulary") {
      dataFile = import("../../data/english-vocabulary.json");
    } else {
      console.warn(`Unknown deck title: ${deckTitle}. Loading default data.`);
      dataFile = import("../../data/capital-countries.json"); // Default fallback
    }

    if (dataFile) {
      dataFile
        .then((module) => {
          setDb(module.default); // module.default is where the imported JSON data resides
        })
        .catch((error) => {
          console.error("Error loading deck data:", error);
          setDb([
            // Fallback data in case of loading error
            {
              question: "Error loading data.",
              answer: "Please check console.",
            },
          ]);
        });
    }
  }, [deckTitle]);

  useEffect(() => {
    const handleSpacebar = (event: KeyboardEvent) => {
      if (event.key === " " || event.code === "Space") {
        // Checks for spacebar
        setShowAnswer(!showAnswer);
      }
    };

    document.addEventListener("keydown", handleSpacebar); // Add listener on mount

    return () => {
      document.removeEventListener("keydown", handleSpacebar); // Remove listener on unmount
    };
  }, [showAnswer]); // Dependency array (important - see below)

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
        prevIndex === 0 ? prevIndex : prevIndex - 1
      );
      setAnimation("slideInLeft");
    }, 400);
    setShowAnswer(false);
  };

  const getCardData = (offset: number) => {
    const index = (currentIndex + offset + db.length) % db.length;
    return db[index];
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="central-card-component">
      <div>
        <div className="headItems">
          <img
            src="src/assets/closebtn.svg"
            alt="Close Button"
            id="closebtn"
            onClick={() => {
              navigate("/home");
            }}
          />
          <p>{deckTitle ? deckTitle : "Capital Countries"}</p>
        </div>
      </div>
      <div className="pgBar-card">
        <ProgressBar
          progress={currentIndex + 1}
          total={db.length}
          activecolor="rgba(104,104,104,1)"
          deactivecolor="white"
        />
      </div>
      <div className="cardContainer">
        <div className="cardStack">
          <div
            className={`card currentCard ${animation}`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="cardHeader">
              <p className="cardHeader-item">
                <span className="current-count">{currentIndex + 1}/</span>
                <span className="total-count">{db.length}</span>
              </p>
              <img
                src={icons.editbtn}
                alt="Edit Button"
                id="editbtn"
                className="cardHeader-item"
              />
            </div>

            <div className="question_container">
              <h2 className="question">
                {getCardData(0).question}
                <img
                  src={icons.speakbtn}
                  alt="Speaker Icon"
                  className="speaker-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(getCardData(0).question);
                  }}
                />
              </h2>
            </div>

            <div className="separator"></div>
            <div className="question">
              <p>
                {showAnswer ? (
                  <div className="answer">
                    {getCardData(0).answer}
                    <img
                      src={icons.speakbtn}
                      alt="Speaker Icon"
                      className="speaker-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(getCardData(0).answer);
                      }}
                    />
                  </div>
                ) : (
                  <div className="reveal">Tap or [Space] to reveal</div>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="navigation">
          <button onClick={handlePrev} className="navButton">
            Previous
          </button>
        </div>
      </div>
      <DifficultyChooser handleNext={handleNext} />
    </div>
  );
};

export default Card;
