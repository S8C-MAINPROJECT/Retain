import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import './HomeCard.css';
import SecondaryBtn from '../Button/secondaryBtn';
import PrimaryBtn from '../Button/PrimaryBtn';
import TextInput from '../Input/textInput';

interface HomeCardProps {
  title: string;
  completed: number;
  total: number;
  onDelete: () => void;
}



const HomeCard: React.FC<HomeCardProps> = ({ title, completed, total, onDelete }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    // Handle the submission logic here
    setIsModalOpen(false);
  };

  return (
    <div className="homeCard">
      <div className="homeCard-items">
        <div className="left-side-items">
        </div>
        <div className="right-side-items" onClick={() => navigate("/card")}>
          <div>
            <h5>{title}</h5>
          </div>
          <div>
            <p>Today: {completed}/{total}</p>
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
        <button
          className="add-card-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card navigation
            setIsModalOpen(true);
          }}
        >
          + Add Card
        </button>
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
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Card</h3>
            </div>
            <TextInput
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)} value={question} />

            <TextInput
              placeholder="Answer"
              onChange={(e) => setAnswer(e.target.value)} value={answer} />


            <div className="modal-buttons">
              <PrimaryBtn
                name="Submit"
                onClick={handleSubmit}
              />
              <SecondaryBtn
                name="Cancel"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
