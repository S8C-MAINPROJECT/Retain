import { ChangeEvent, useState, useEffect } from "react";
import icons from "../../assets/icons";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../../components/Input/textInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import HomeCard from "../../components/HomeCard/HomeCard";
import { AddNew } from "../../components/AddNew/AddNew";
import { jwtDecode } from "jwt-decode";
import Summarizer from "../../components/Summarizer/Summarizer";

const Home = () => {
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

  // Function to extract uid from the access token
  const getUidFromToken = (token: string) => {
    console.log(token);
    const decoded: { id: number } = jwtDecode(token);
    console.log(decoded.id);
    return decoded.id;
  };

  const fetchDecks = async () => {
    const token = localStorage.getItem("accessToken"); // Retrieve token
    if (!token) return;

    const uid = getUidFromToken(token); // Extract user ID from token

    try {
      const response1 = await axios.get(
        `http://localhost:3000/decks/user/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDecks(response1.data); // Update state with fetched decks

      const response2 = await axios.get(
        `http://localhost:3000/decks/due-cards/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDueDecks(response2.data); // Update state with fetched
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  // Call fetchDecks when the component mounts
  useEffect(() => {
    fetchDecks();
  }, []);

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

  return (
    <>
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
      {activeNav === "deck" && (
        <div className="home">
          <h3>
            Welcome Back! you got <span id="no_lessons">3</span> lessons to
            review
          </h3>
          <div className="decks">
            {dueDecks.length > 0 &&
              dueDecks.map((dueDeck, index) => (
                <HomeCard
                  key={index}
                  did={dueDeck.did}
                  title={dueDeck.title}
                  completed={dueDeck.duecount}
                  total={dueDeck.totalcount}
                  onDelete={() => handleDeleteDeck(index)} // Pass the current index
                  path="src/assets/jjj.webp"
                />
              ))}
          </div>

          <h3>All Decks</h3>
          <div className="decks">
            <AddNew onManual={() => setIsDeckModalOpen(true)} />
            {decks.map((deck, index) => (
              <HomeCard
                key={index}
                did={deck.did}
                title={deck.title}
                completed={deck.duecount}
                total={deck.totalcount}
                onDelete={() => handleDeleteDeck(index)}
                path="src/assets/jjj.webp"
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
