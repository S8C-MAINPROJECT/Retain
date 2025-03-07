// src/pages/Card/Card.tsx
import { useState, useEffect } from "react";
import "./Card.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import icons from "../../assets/icons";
import DifficultyChooser from "../../components/DifficultyChooser/DifficultyChooser";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Card as FSRSCardType,
  Rating,
  Grade,
} from "ts-fsrs";

interface CardInStorage extends FSRSCardType {
  cid: string; // Card ID, maybe generated using UUID or similar
  did: string; // Deck ID - if needed for organizing decks
  front: string;
  back: string;
}

const Card = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let deckTitle = params.get("title");
  if (deckTitle) {
    deckTitle = decodeURIComponent(deckTitle);
  }
  const navigate = useNavigate();
  const [progress, setProgress] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState("");
  const [dueDate, SetDueDate] = useState(new Date());
  const [db, setDb] = useState<CardInStorage[]>([
    {
      cid: "loading-cid",
      did: "loading-did",
      front: "Loading...",
      back: "Please wait.",
      due: new Date(),
      stability: 0,
      difficulty: 0,
      elapsed_days: 0,
      scheduled_days: 0,
      lapses: 0,
      reps: 0,
      state: 0,
    },
  ]);
  // Define type for db state
  // const card1 = {
  //   cid: "1",
  //   did: "1",
  //   front: "What is the synonym of 'Happy'?",
  //   back: "The synonym of 'Happy' is 'Joyful'.",
  //   due: new Date("2022-2-1 10:00:00"), // Date when the card is next due for review
  //   stability: 0,
  //   difficulty: 0, // Reflects the inherent difficulty of the card content
  //   elapsed_days: 0, // Days since the card was last reviewed
  //   scheduled_days: 0, // The interval at which the card is next scheduled
  //   reps: 0, // Total number of times the card has been reviewed
  //   lapses: 0,
  //   state: 0, // Times the card was forgotten or remembered incorrectly
  //   };

  const param = generatorParameters({
    enable_fuzz: true,
    enable_short_term: false,
  });
  const f = fsrs(param);
  // const card = createEmptyCard(new Date("2022-2-1 10:00:00"));
  // const now = new Date("2022-2-2 10:00:00"); // new Date();
  // const scheduling_cards1 = f.repeat(
  //   // Create a new object excluding cid, did, front, and back
  //   (({ cid, did, front, back, ...card1WithoutExcluded }) =>
  //     card1WithoutExcluded)(card1),
  //   now
  // );
  // const scheduling_cards = f.repeat(card, now);
  // console.log(scheduling_cards);
  // console.log(scheduling_cards1);

  // console.log(card);
  // console.log(card1);

  useEffect(() => {
    console.log("Deck Title in Card:", deckTitle);
    let dataFile = null;
    let localStorageKey = `card_${deckTitle}`;

    // Determine the JSON file to load based on deckTitle
    if (deckTitle === "Capital Countries") {
      dataFile = import("../../data/capital-countries.json");
    } else if (deckTitle === "Artificial Intelligence") {
      dataFile = import("../../data/english-vocabulary.json");
    } else {
      console.warn(`Unknown deck title: ${deckTitle}. Loading default data.`);
      dataFile = import("../../data/capital-countries.json"); // Default fallback
    }

    const loadCards = async () => {
      let storedCards = await localStorage.getItem(localStorageKey);
      if (storedCards) {
        const ParsedCards = JSON.parse(storedCards);
        // console.log("Loaded cards from local storage:", storedCards);
        setDb(ParsedCards);
      } else if (dataFile) {
        try {
          const module = await dataFile;
          const initialCardsFromJSON = module.default;
          const initializedCards: CardInStorage[] = initialCardsFromJSON.map(
            (cardData: { question: string; answer: string }, index: number) => {
              const fsrsCard = createEmptyCard(new Date()); // Initialize FSRS card with current date
              return {
                // Spread FSRS initial properties
                cid: String(index + 1), // Simple CID, consider UUID for real app
                did: "1", // Default Deck ID
                front: cardData.question,
                back: cardData.answer,
                ...fsrsCard,
              };
            }
          );
          console.log("from data");
          setDb(initializedCards);
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(initializedCards)
          ); // Store initialized cards
        } catch (error) {
          console.error("Error loading or initializing deck data:", error);
          setDb([
            {
              cid: "error-cid",
              did: "error-did",
              front: "Error loading data.",
              back: "Please check console.",
              due: new Date(),
              stability: 0,
              difficulty: 0,
              elapsed_days: 0,
              scheduled_days: 0,
              lapses: 0,
              reps: 0,
              state: 0,
            },
          ]);
        }
      }
    };

    loadCards();
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

  const handleNext = (difficulty: Grade) => {
    const shedule = f.repeat(getCardData(0), new Date());
    SetDueDate(shedule[difficulty].card.due);
    console.log(shedule[difficulty].card.due);
    setTimeout(() => {
      setAnimation("slideOutLeft");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % db.length);
        setAnimation("slideInRight");
      }, 400);
      setShowAnswer(false);
    }, 1200);
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
                {getCardData(0).front}
                <img
                  src={icons.speakbtn}
                  alt="Speaker Icon"
                  className="speaker-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(getCardData(0).front);
                  }}
                />
              </h2>
            </div>

            <div className="separator"></div>
            <div className="question">
              <p>
                {showAnswer ? (
                  <div className="answer">
                    {getCardData(0).back}
                    <img
                      src={icons.speakbtn}
                      alt="Speaker Icon"
                      className="speaker-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(getCardData(0).back);
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
      <div>
        <div className="difficultyOptions">
          <button className="difficultyBtn hard" onClick={() => handleNext(1)}>
            <span className="difficultyTime">15 min</span>
            <br></br>
            <span className="difficultyMeasure">Again</span>
          </button>
          <button className="difficultyBtn hard" onClick={() => handleNext(2)}>
            <span className="difficultyTime">15 min</span>
            <br></br>
            <span className="difficultyMeasure">Hard</span>
          </button>
          <button className="difficultyBtn easy" onClick={() => handleNext(3)}>
            <span className="difficultyTime">1 day</span>
            <br></br>
            <span className="difficultyMeasure">Good</span>
          </button>
          <button
            className="difficultyBtn medium"
            onClick={() => handleNext(4)}
          >
            <span className="difficultyTime">4 day</span>
            <br></br>
            <span className="difficultyMeasure">Easy</span>
          </button>
        </div>
        <div className="dueDate">Next Due Date: {dueDate.toDateString()}</div>
      </div>
    </div>
  );
};

export default Card;
