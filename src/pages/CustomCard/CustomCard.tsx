// // src/pages/Card/Card.tsx
// import axios from "axios";
// import { useState, useEffect } from "react";
// import "./Card.css";
// import ProgressBar from "../../components/ProgressBar/ProgressBar";
// import icons from "../../assets/icons";
// import DifficultyChooser from "../../components/DifficultyChooser/DifficultyChooser";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   createEmptyCard,
//   fsrs,
//   generatorParameters,
//   Card as FSRSCardType,
//   Rating,
//   Grade,
// } from "ts-fsrs";

// interface CardInStorage extends FSRSCardType {
//   cid: string; // Card ID, maybe generated using UUID or similar
//   did: string; // Deck ID - if needed for organizing decks
//   front: string;
//   back: string;
// }

// const Card = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   let deckTitle = params.get("deckTitle");
//   if (deckTitle) {
//     deckTitle = decodeURIComponent(deckTitle);
//   }
//   const navigate = useNavigate();
//   const [progress, setProgress] = useState(2);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [animation, setAnimation] = useState("");
//   const [dueDate, SetDueDate] = useState(new Date());
//   const [db, setDb] = useState<CardInStorage[]>([
//     {
//       cid: "loading-cid",
//       did: "loading-did",
//       front: "Loading...",
//       back: "Please wait.",
//       due: new Date(),
//       stability: 0,
//       difficulty: 0,
//       elapsed_days: 0,
//       scheduled_days: 0,
//       lapses: 0,
//       reps: 0,
//       state: 0,
//     },
//   ]);
//   // Define type for db state
//   // const card1 = {
//   //   cid: "1",
//   //   did: "1",
//   //   front: "What is the synonym of 'Happy'?",
//   //   back: "The synonym of 'Happy' is 'Joyful'.",
//   //   due: new Date("2022-2-1 10:00:00"), // Date when the card is next due for review
//   //   stability: 0,
//   //   difficulty: 0, // Reflects the inherent difficulty of the card content
//   //   elapsed_days: 0, // Days since the card was last reviewed
//   //   scheduled_days: 0, // The interval at which the card is next scheduled
//   //   reps: 0, // Total number of times the card has been reviewed
//   //   lapses: 0,
//   //   state: 0, // Times the card was forgotten or remembered incorrectly
//   //   };

//   const param = generatorParameters({
//     enable_fuzz: true,
//     enable_short_term: false,
//   });
//   const f = fsrs(param);
//   // const card = createEmptyCard(new Date("2022-2-1 10:00:00"));
//   // const now = new Date("2022-2-2 10:00:00"); // new Date();
//   // const scheduling_cards1 = f.repeat(
//   //   // Create a new object excluding cid, did, front, and back
//   //   (({ cid, did, front, back, ...card1WithoutExcluded }) =>
//   //     card1WithoutExcluded)(card1),
//   //   now
//   // );
//   // const scheduling_cards = f.repeat(card, now);
//   // console.log(scheduling_cards);
//   // console.log(scheduling_cards1);

//   // console.log(card);
//   // console.log(card1);

//   useEffect(() => {
//     const deckTitle = params.get("deckTitle");
//     const did = params.get("did"); // Get the deck ID from the URL query string

//     // Fetch cards from the API using the deck ID
//     const loadCards = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/flashcards/${did}`
//         );
//         const apiCards: CardInStorage[] = response.data.map((item: any) => ({
//           cid: item._id, // Or however you get the CID from your API response
//           did: item.did,
//           front: item.question,
//           back: item.answer,
//           due: new Date(item.due_date), // Parse the date string
//           // ... map other properties from your API response
//           stability: 0,
//           difficulty: 0,
//           elapsed_days: 0,
//           scheduled_days: 0,
//           lapses: 0,
//           reps: 0,
//           state: 0,
//         })); // Assuming the API returns an array of CardInStorage objects
//         setDb(apiCards);
//       } catch (error: any) {
//         console.error("Error loading data from API:", error);
//         setDb([
//           {
//             cid: "error-cid",
//             did: "error-did",
//             front: "Error loading data from API.",
//             back: error.message || "Please check console.",
//             due: new Date(),
//             stability: 0,
//             difficulty: 0,
//             elapsed_days: 0,
//             scheduled_days: 0,
//             lapses: 0,
//             reps: 0,
//             state: 0,
//           },
//         ]);
//       }
//     };

//     loadCards();

//     console.log(db);
//   }, [deckTitle]);

//   useEffect(() => {
//     const handleSpacebar = (event: KeyboardEvent) => {
//       if (event.key === " " || event.code === "Space") {
//         // Checks for spacebar
//         setShowAnswer(!showAnswer);
//       }
//     };

//     document.addEventListener("keydown", handleSpacebar); // Add listener on mount

//     return () => {
//       document.removeEventListener("keydown", handleSpacebar); // Remove listener on unmount
//     };
//   }, [showAnswer]); // Dependency array (important - see below)

//   const handleNext = (difficulty: Grade) => {
//     const shedule = f.repeat(getCardData(0), new Date());
//     SetDueDate(shedule[difficulty].card.due);
//     console.log(shedule[difficulty].card.due);
//     setTimeout(() => {
//       setAnimation("slideOutLeft");
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % db.length);
//         setAnimation("slideInRight");
//       }, 400);
//       setShowAnswer(false);
//     }, 1200);
//   };

//   const handlePrev = () => {
//     setAnimation("slideOutRight");
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === 0 ? prevIndex : prevIndex - 1
//       );
//       setAnimation("slideInLeft");
//     }, 400);
//     setShowAnswer(false);
//   };

//   const getCardData = (offset: number) => {
//     const index = (currentIndex + offset + db.length) % db.length;
//     return db[index];
//   };

//   const speakText = (text: string) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="central-card-component">
//       <div>
//         <div className="headItems">
//           <img
//             src="src/assets/closebtn.svg"
//             alt="Close Button"
//             id="closebtn"
//             onClick={() => {
//               navigate("/home");
//             }}
//           />
//           <p>{deckTitle ? deckTitle : "Capital Countries"}</p>
//         </div>
//       </div>
//       <div className="pgBar-card">
//         <ProgressBar
//           progress={currentIndex + 1}
//           total={db.length}
//           activecolor="rgba(104,104,104,1)"
//           deactivecolor="white"
//         />
//       </div>
//       <div className="cardContainer">
//         <div className="cardStack">
//           <div
//             className={`card currentCard ${animation}`}
//             onClick={() => setShowAnswer(!showAnswer)}
//           >
//             <div className="cardHeader">
//               <p className="cardHeader-item">
//                 <span className="current-count">{currentIndex + 1}/</span>
//                 <span className="total-count">{db.length}</span>
//               </p>
//               <img
//                 src={icons.editbtn}
//                 alt="Edit Button"
//                 id="editbtn"
//                 className="cardHeader-item"
//               />
//             </div>

//             <div className="question_container">
//               <h2 className="question">
//                 {getCardData(0)?.front || ""}
//                 <img
//                   src={icons.speakbtn}
//                   alt="Speaker Icon"
//                   className="speaker-icon"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     speakText(getCardData(0).front);
//                   }}
//                 />
//               </h2>
//             </div>

//             <div className="separator"></div>
//             <div className="question">
//               <div>
//                 {showAnswer ? (
//                   <div className="answer">
//                     {getCardData(0)?.back || ""}
//                     <img
//                       src={icons.speakbtn}
//                       alt="Speaker Icon"
//                       className="speaker-icon"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         speakText(getCardData(0).back);
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <div className="reveal">Tap or [Space] to reveal</div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="navigation">
//           <button onClick={handlePrev} className="navButton">
//             Previous
//           </button>
//         </div>
//       </div>
//       <div>
//         <div className="difficultyOptions">
//           <button className="difficultyBtn hard" onClick={() => handleNext(1)}>
//             <span className="difficultyTime">15 min</span>
//             <br></br>
//             <span className="difficultyMeasure">Again</span>
//           </button>
//           <button className="difficultyBtn hard" onClick={() => handleNext(2)}>
//             <span className="difficultyTime">15 min</span>
//             <br></br>
//             <span className="difficultyMeasure">Hard</span>
//           </button>
//           <button className="difficultyBtn easy" onClick={() => handleNext(3)}>
//             <span className="difficultyTime">1 day</span>
//             <br></br>
//             <span className="difficultyMeasure">Good</span>
//           </button>
//           <button
//             className="difficultyBtn medium"
//             onClick={() => handleNext(4)}
//           >
//             <span className="difficultyTime">4 day</span>
//             <br></br>
//             <span className="difficultyMeasure">Easy</span>
//           </button>
//         </div>
//         <div className="dueDate">Next Due Date: {dueDate.toDateString()}</div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import axios from "axios";
import { useState, useEffect } from "react";
import "./CustomCard.module.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import icons from "../../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fsrs,
  generatorParameters,
  Card as FSRSCardType,
  Grade,
} from "ts-fsrs";

interface CardInStorage extends FSRSCardType {
  cid: string;
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
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

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

  useEffect(() => {
    const did = params.get("did");

    const loadCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/flashcards/${did}`
        );
        const currentDate = new Date();
        const apiCards: CardInStorage[] = response.data.map((item: any) => ({
          cid: item._id,
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
            cid: "error-cid",
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
      const response = await axios.post("http://localhost:3000/sfrs/review", {
        card: currentCard,
        difficulty: difficulty,
      });

      const updatedCard = response.data;
      setDueDate(new Date(updatedCard.due));

      console.log("Updated due date:", updatedCard.due);

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

        <div className="navigation">
          <button onClick={handlePrev} className="navButton">
            Previous
          </button>
        </div>
      </div>

      <div className="difficultyOptions">
        <button className="difficultyBtn hard" onClick={() => handleNext(1)}>
          Again (15 min)
        </button>
        <button className="difficultyBtn hard" onClick={() => handleNext(2)}>
          Hard (15 min)
        </button>
        <button className="difficultyBtn easy" onClick={() => handleNext(3)}>
          Good (1 day)
        </button>
        <button className="difficultyBtn medium" onClick={() => handleNext(4)}>
          Easy (4 days)
        </button>
      </div>
      <div className="dueDate">Next Due Date: {dueDate.toDateString()}</div>
    </div>
  );
};

export default Card;
