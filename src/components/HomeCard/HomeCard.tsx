import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./HomeCard.css";
import icons from "../../assets/icons";
import axios from "axios";

interface HomeCardProps {
  title: string;
  did: number;
  dueCount: number;
  total: number;
  onDelete: (did: number) => void;
  path: string;
  custom: boolean;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  did,
  dueCount,
  total,
  onDelete,
  path,
  custom,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents accidental navigation on delete click
    try {
      await axios.delete(`http://localhost:3000/decks/${did}`);
      onDelete(did); // Trigger the callback after successful deletion
      console.log("Deck deleted successfully");
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  const handleCardClick = () => {
    if (custom == false) navigate(`/card?deckTitle=${title}&did=${did}`);
    else navigate(`/customcard?deckTitle=${title}&did=${did}`);
  };

  const imagePaths = ["src/assets/Frame 95.jpg", "src/assets/Frame 94.jpg"];
  const [selectedImagePath] = useState(
    imagePaths[Math.floor(Math.random() * imagePaths.length)]
  );

  return (
    <div className="homeCard">
      <div className="homeCard-items">
        <div className="left-side-items">
          <img src={path} alt="Deck Cover" />
        </div>
        <div className="right-side-items" onClick={handleCardClick}>
          <div>
            <h5>{title}</h5>
          </div>
          <div className="progress">
            {custom == false && <p>{dueCount} card(s) to review</p>}
            {custom == true && <p>Review all now</p>}
          </div>
        </div>
      </div>
      <div className="button-container">
        <div
          className="editAndView"
          onClick={() => navigate("/deck", { state: { did, title } })}
        >
          <img src={icons.edit2} alt="Edit Icon" />
          view and edit
        </div>
        <button className="delete-button" onClick={handleDelete}>
          × Delete deck
        </button>
      </div>
    </div>
  );
};

export default HomeCard;

// onClick={() => navigate("/deck", { state: { did: 42, title: `${title}` } })}
// onClick={() => navigate(`/deck?deckTitle=${title}`)}
