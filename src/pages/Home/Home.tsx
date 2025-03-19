import { ChangeEvent, useState, useEffect } from "react";
import icons from "../../assets/icons";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../../components/Input/textInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import HomeCard from "../../components/HomeCard/HomeCard";
import { AddNew } from "../../components/AddNew/AddNew";
import { jwtDecode } from "jwt-decode";
import Summarizer from "../../components/Summarizer/Summarizer";
import EmotionFeedback from "../../components/EmotionFeeback/Emotion";

const Home = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    location.state ? location.state.isLoggedIn : false
  );
  const [deckTitle, setDeckTitle] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [decks, setDecks] = useState<
    Array<{ did: number; title: string; duecount: number; totalcount: number }>
  >([]);
  const [dueDecks, setDueDecks] = useState<
    Array<{ did: number; title: string; duecount: number; totalcount: number }>
  >([]);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<String | null>("deck");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dueCardsMap, setDueCardsMap] = useState<Record<number, number>>({});
  const [isEmotionFeedbackOpen, setIsEmotionFeedbackOpen] = useState(true);
  const [count, setCount] = useState(0);

  // Function to extract uid from the access token
  const getUidFromToken = (token: string) => {
    console.log(token);
    const decoded: { id: number } = jwtDecode(token);
    console.log(decoded.id);
    return decoded.id;
  };

  useEffect(() => {
    async function fetchDecks() {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const uid = getUidFromToken(token);
      try {
        const response = await axios.get(
          `http://localhost:3000/decks/user/${uid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDecks(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    }

    fetchDecks();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (decks.length === 0) return; // Prevent running on first render when decks are empty

    async function fetchDueCardsCount() {
      try {
        const dueCardsArray = await Promise.all(
          decks.map(async (deck: any) => {
            try {
              const response = await axios.get(
                `http://localhost:3000/flashcards/${deck.did}`
              );

              const currentDate = new Date();
              const dueCards = response.data.filter(
                (card: any) => new Date(card.due_date) <= currentDate
              );

              return { did: deck.did, dueCount: dueCards.length };
            } catch (error) {
              console.error(
                `Error fetching cards for deck ${deck.did}:`,
                error
              );
              return { did: deck.did, dueCount: 0 };
            }
          })
        );

        const dueCardsObj = dueCardsArray.reduce((acc, item) => {
          acc[item.did] = item.dueCount;
          return acc;
        }, {} as Record<number, number>);

        setDueCardsMap(dueCardsObj);
      } catch (error) {
        console.error("Error fetching due cards:", error);
      }
    }

    fetchDueCardsCount();
    const countDueDecks = decks.filter(
      (dueDeck) => dueCardsMap[dueDeck.did] >= 1
    ).length;
    setCount(countDueDecks);
  }, [decks, dueCardsMap]); // Runs when `decks` changes

  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDeckSubmit = () => {
    if (deckTitle && totalQuestions) {
      setDecks([
        ...decks,
        {
          did: decks.length + 1,
          title: deckTitle,
          duecount: 0,
          totalcount: parseInt(totalQuestions),
        },
      ]);
      console.log(decks);
      setDeckTitle("");
      setTotalQuestions("");
      setIsDeckModalOpen(false);
    }
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const uid = getUidFromToken(token);

      axios.post(
        "http://localhost:3000/decks",
        {
          did: decks.length + 1,
          uid: uid,
          totalcount: totalQuestions,
          duecount: 0,
          title: deckTitle,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Deck created successfully.");
      // fetchDecks();
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleDeleteDeck = (index: number) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      setDecks(decks.filter((_, i) => i !== index));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEmotionSubmit = (emotion: string) => {
    console.log("Emotion submitted:", emotion);
    setIsEmotionFeedbackOpen(false);

    // Here you might want to do something with the emotion, like send it to a server
  };

  const handleEmotionModalClose = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn && (
        <EmotionFeedback
          onClose={handleEmotionModalClose}
          setIsEmotionFeedbackOpen={setIsEmotionFeedbackOpen}
        />
      )}
      {/* Header */}
      <div className="homeHeader">
        <div className="logo">
          <img src={icons.retainSymbol} alt="Retain Logo" />
          <span className="home-heading">Retain</span>
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
          {" "}
          {/* Conditionally apply 'open' class */}
          <div
            className={`nav-item ${activeNav === "deck" ? "active" : ""}`} // Conditional 'active' class
            onClick={() => setActiveNav("deck")} // Handle click for Deck
          >
            Deck
          </div>
          <div
            className={`nav-item ${activeNav === "summarize" ? "active" : ""}`} // Conditional 'active' class
            onClick={() => setActiveNav("summarize")} // Handle click for Summarize
          >
            Summarize
          </div>
          <div className="nav-item logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
      const [count, setCount] = useState(0);
      {activeNav === "deck" && (
        <div className="home">
          <h3>
            Welcome Back! You got <span id="no_lessons">{count}</span>{" "}
            {count === 1 ? "lesson" : count === 0 ? "lessons" : "lessons"} to
            review.
          </h3>

          <div className="decks">
            {decks.length > 0 &&
              decks.map(
                (dueDeck, index) =>
                  dueCardsMap[dueDeck.did] >= 1 && (
                    <HomeCard
                      key={index}
                      did={dueDeck.did}
                      title={dueDeck.title}
                      dueCount={dueCardsMap[dueDeck.did]}
                      total={dueDeck.totalcount}
                      onDelete={() => handleDeleteDeck(index)} // Pass the current index
                      path="src/assets/jjj.webp"
                      custom={false}
                    />
                  )
              )}
          </div>

          <h3>All Decks</h3>
          <div className="decks">
            <AddNew onManual={() => setIsDeckModalOpen(true)} />
            {decks.map((deck, index) => (
              <HomeCard
                key={index}
                did={deck.did}
                title={deck.title}
                dueCount={deck.duecount}
                total={deck.totalcount}
                onDelete={() => handleDeleteDeck(index)}
                path="src/assets/jjj.webp"
                custom={true}
              />
            ))}
          </div>

          {isDeckModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Create New Deck</h3>
                </div>
                <TextInput
                  placeholder="Deck Title"
                  onChange={(e) => setDeckTitle(e.target.value)}
                  value={deckTitle}
                />
                <TextInput
                  placeholder="Number of Questions"
                  onChange={(e) => setTotalQuestions(e.target.value)}
                  value={totalQuestions}
                />
                <div className="modal-buttons">
                  <PrimaryBtn name="Create" onClick={handleDeckSubmit} />
                  <SecondaryBtn
                    name="Cancel"
                    onClick={() => setIsDeckModalOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeNav === "summarize" && <Summarizer />}
    </>
  );
};

export default Home;
