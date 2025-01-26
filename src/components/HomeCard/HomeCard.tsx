import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./HomeCard.css";
import SecondaryBtn from "../Button/secondaryBtn";
import PrimaryBtn from "../Button/PrimaryBtn";
import TextInput from "../Input/textInput";
import icons from "../../assets/icons";

interface HomeCardProps {
  title: string;
  completed: number;
  total: number;
  onDelete: () => void;
  path: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  completed,
  total,
  onDelete,
  path,
}) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    // Handle the submission logic here
    setIsModalOpen(false);
  };

  return (
    <div className="homeCard">
      <div className="homeCard-items">
        <div className="left-side-items">
          <img src={path} alt="card" />
        </div>
        <div className="right-side-items" onClick={() => navigate("/card")}>
          <div>
            <h5>{title}</h5>
          </div>
          <div className="progress">
            <p>
              Today: {completed}/{total}
            </p>
          </div>
          <div className="pgBar-home">
            <ProgressBar
              progress={completed}
              total={total}
              activecolor="rgba(81, 197, 70, 1)"
              deactivecolor="rgba(171, 250, 164, 1)"
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <div className="editAndView" onClick={() => navigate("/test")}>
          <img src={icons.edit2} />
          view and edit
        </div>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card navigation
            onDelete();
          }}
        >
          × Delete deck
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
