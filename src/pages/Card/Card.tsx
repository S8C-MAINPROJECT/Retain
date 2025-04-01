import axios from "axios";
import { useState, useEffect } from "react";
import "./Card.css";
import icons from "../../assets/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card as FSRSCardType, Grade } from 'ts-fsrs';
import DifficultyChooser from '../../components/DifficultyChooser/DifficultyChooser';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CompletionModal from '../../components/CompletionModal/CompletionModal'; // Import the modal

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
  const p = useParams();
  const { d } = p;
  const { dd } = p;

  let deckTitle = params.get("deckTitle");
  if (deckTitle) {
    deckTitle = decodeURIComponent(deckTitle);
  }
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState('');
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        // Fetch Deck ID
        const response = await axios.get(
          `http://localhost:3000/decks/deckIdfromTitle/${deckTitle}`
        );
        const deckId = response.data.did;
        console.log("Deck ID:", deckId);
        console.log("Params:", d, "Deck Title:", dd);
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
      _id: "loading-id",
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
    handleNext(difficulty);
  };

  // Handler for closing the modal and navigating
  const handleModalClose = () => {
    setIsCompletionModalOpen(false);
    navigate('/home'); // Navigate after closing the modal
  };

  const handleEmotions = (cardDetails: any) => {
    if (cardDetails.cardType === 'new') {
      if (cardDetails.emotionalResponse === "confident") {
        cardDetails.easeFactor = 2.5;
        cardDetails.nextInterval = 1;
      } else if (cardDetails.emotionalResponse === "neutral") {
        cardDetails.easeFactor = 2.3;
        cardDetails.nextInterval = 0.5;
      } else if (cardDetails.emotionalResponse === "frustrated") {
        cardDetails.easeFactor = 2.0;
        cardDetails.nextInterval = 0.2;
      }
    } else if (cardDetails.cardType === "learning") {
      if (cardDetails.emotionalResponse === "confident") {
        cardDetails.easeFactor += 0.15;
        cardDetails.nextInterval *= 1.8;
      } else if (cardDetails.emotionalResponse === "neutral") {
        cardDetails.easeFactor += 0.05;
        cardDetails.nextInterval *= 1.2;
      } else if (cardDetails.emotionalResponse === "frustrated") {
        cardDetails.easeFactor -= 0.25;
        cardDetails.nextInterval *= 0.5;
      }
    }
  };

  useEffect(() => {
    const did = params.get("did");

    const loadCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/flashcards/${did}`
        );
        const currentDate = new Date();
        const apiCards: CardInStorage[] = response.data
          .map((item: any) => ({
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
          }))
          .filter((card: CardInStorage) => card.due <= currentDate);
        setDb(apiCards);
      } catch (error: any) {
        console.error("Error loading data from API:", error);
        setDb([
          {
            _id: "error-id",
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

  handleEmotions(Card);

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
      console.log("Updated card:", updatedCard);
      console.log("Updated due date:", updatedCard.due);

      setTimeout(() => {
        setAnimation('slideOutLeft');
        setTimeout(() => {
          if (currentIndex === db.length - 1 && db.length > 0) {
            // Last card reviewed and db is not empty
            setIsCompletionModalOpen(true); // Open the modal instead of alert/navigate
          } else if (db.length > 0) {
            // Move to the next card (ensure db is not empty)
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setAnimation('slideInRight');
          }
          setShowAnswer(false); // Reset answer visibility for the next card or after completion
        }, 400); // Animation duration
      }, 1200); // Delay before starting the animation
    } catch (error) {
      console.error("Error updating card:", error);
    }
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
              {currentIndex} out of {total} complete
            </p>
            <div className="progressBar">
              <ProgressBar
                progress={currentIndex}
                total={5}
                activecolor="rgba(81, 197, 70, 1)"
                deactivecolor="rgba(171, 250, 164, 1)"
              />
            </div>
          </div>
          <p className="keepGoing">Keep going!</p>
          <div className="emojis-container">
            <DifficultyChooser onDifficultySelect={handleDifficultySelection} />
          </div>
        </div>
      </div>
      {/* Render the modal conditionally */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        message="Congratulations! You've reviewed all cards in this deck."
        redirectPath="/home"
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Card;
