import axios from "axios";
import { useState, useEffect } from "react";
import "./CustomCard.module.css";
import icons from "../../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Card as FSRSCardType, Grade } from "ts-fsrs";
import DifficultyChooser from "../../components/DifficultyChooser/DifficultyChooser";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

interface CardInStorage extends FSRSCardType {
  _id: string;
  fid: Number;
  did: string;
  front: string;
  back: string;
}

const Card = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let deckTitle = params.get("deckTitle");
  if (deckTitle) {
    deckTitle = decodeURIComponent(deckTitle);
  }
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        // Fetch Deck ID
        const response = await axios.get(
          `http://localhost:3000/decks/deckIdfromTitle/${deckTitle}`
        );
        const deckId = response.data.did;
        console.log("Deck ID:", deckId);

        // Fetch total flashcards using deckId
        const flashcardsResponse = await axios.get(
          `http://localhost:3000/flashcards/total-flashcards/${deckId}`
        );
        console.log("Total flashcards:", flashcardsResponse.data.total);
        setTotal(flashcardsResponse.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDeckAndFlashcards(); // Call the async function
  }, [deckTitle]); // Add deckTitle as a dependency if it changes

  const [db, setDb] = useState<CardInStorage[]>([
    {
      _id: "loading-_id",
      fid: 404,
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

  const handleDifficultySelection = (difficulty: Grade) => {
    handleNext(difficulty); // Call the handleNext function to proceed with the selected difficulty
  };

  useEffect(() => {
    const did = params.get("did");
    const loadCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/flashcards/${did}`
        );
        const apiCards: CardInStorage[] = response.data.map((item: any) => ({
          _id: item._id,
          fid: item.fid,
          did: item.did,
          front: item.question,
          back: item.answer,
          due: new Date(item.due_date),
          stability: item.stability || 0,
          difficulty: item.difficulty || 0,
          elapsed_days: item.elapsed_days || 0,
          scheduled_days: item.scheduled_days || 0,
          lapses: item.lapses || 0,
          reps: item.reps || 0,
          state: item.state || 0,
        }));
        setDb(apiCards);
      } catch (error: any) {
        console.error("Error loading data from API:", error);
        setDb([
          {
            _id: "error-_id",
            fid: 404,
            did: "error-did",
            front: "Error loading data from API.",
            back: error.message || "Please check console.",
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
    };

    loadCards();
  }, [deckTitle]);

  useEffect(() => {
    const handleSpacebar = (event: KeyboardEvent) => {
      if (event.key === " " || event.code === "Space") {
        setShowAnswer(!showAnswer);
      }
    };

    document.addEventListener("keydown", handleSpacebar);

    return () => {
      document.removeEventListener("keydown", handleSpacebar);
    };
  }, [showAnswer]);

  const handleNext = async (difficulty: Grade) => {
    try {
      const currentCard = getCardData(0);
      console.log("fid", currentCard.fid);
      const response = await axios.post("http://localhost:3000/sfrs/review", {
        card: currentCard,
        difficulty: difficulty,
        fid: currentCard.fid,
      });

      const updatedCard = response.data;
      setDueDate(new Date(updatedCard.due));

      console.log("Updated due date:", updatedCard);

      setTimeout(() => {
        setAnimation("slideOutLeft");
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % db.length);
          setAnimation("slideInRight");
        }, 400);
        setShowAnswer(false);
      }, 1200);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };
  const handleNextButton = () => {setTimeout(() => {
    setAnimation("slideOutLeft");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % db.length);
      setAnimation("slideInRight");
    }, 400);
    setShowAnswer(false);
  }, 1200);};
  const handlePrev = () => {setTimeout(() => {
    setAnimation("slideOutRight");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + db.length) % db.length);
      setAnimation("slideInLeft");
    }, 400);
    setShowAnswer(false);
  }, 1200);};
  const getCardData = (offset: number) => {
    const index = (currentIndex + offset + db.length) % db.length;
    return db[index];
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="Gparant">
      <div
        className="RetainHeading"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        <img src={icons.retainSymbol} alt="Retain Logo" />
        <span className="home-heading">Retain</span>
      </div>
      <div className="parent">
        <div className="left">
          <div className="central-card-component">
            <div>
              <div className="headItems">
                <p>{deckTitle ? deckTitle : "Capital Countries"}</p>
              </div>
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
                  </div>

                  <div className="question_container">
                    <h2 className="question">
                      {getCardData(0)?.front || ""}
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
                    {showAnswer ? (
                      <div className="answer">
                        {getCardData(0)?.back || ""}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="middleLine"></div>
        <div className="right">
          <div className="progressContainerRight">
            <p className="progressCountKeeper">
              {currentIndex + 1} out of {db.length}
            </p>
            <div className="progressBar">
              <ProgressBar
                progress={currentIndex}
                total={db.length}
                activecolor="rgba(81, 197, 70, 1)"
                deactivecolor="rgba(171, 250, 164, 1)"
              />
            </div>
          </div>
          <p className="keepGoing">Keep going!</p>
          <div className="emojis-container">
            <DifficultyChooser onDifficultySelect={handleDifficultySelection} />
          </div>
          <div className="nxtPreviousButtons" style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10px",
          }}>
              <div><button className="previous-button" onClick={handleNextButton}>Next</button></div>
              <div><button className="previous-button" onClick={handlePrev}>Previous</button></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
