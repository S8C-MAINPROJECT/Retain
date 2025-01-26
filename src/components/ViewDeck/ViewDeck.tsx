import React, { useState, useEffect } from "react";
import styles from "./ViewDeck.module.css";
import "../HomeCard/HomeCard.css";
import icons from "../../assets/icons";
import BackBtn from "../Button/backBtn";
import TextInput from "../Input/textInput";
import PrimaryBtn from "../Button/PrimaryBtn";
import SecondaryBtn from "../Button/secondaryBtn";
import { useNavigate } from "react-router-dom";

interface Flashcard {
  front: string;
  back: string;
}

// Key for localStorage
const STORAGE_KEY = "flashcards";

function ViewDeck() {
  // Load flashcards from localStorage or use default values
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const savedFlashcards = localStorage.getItem(STORAGE_KEY);
    return savedFlashcards
      ? JSON.parse(savedFlashcards)
      : [
          {
            front: "What is React?",
            back: "A JavaScript library for building user interfaces.",
          },
          {
            front: "What is TypeScript?",
            back: "A typed superset of JavaScript.",
          },
          {
            front: "What is JSX?",
            back: "A syntax extension for JavaScript used with React.",
          },
        ];
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentEdit, setCurrentEdit] = useState<Flashcard | null>(null);
  const Navigate = useNavigate();

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  }, [flashcards]);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setCurrentEdit({ ...flashcards[index] });
  };

  const handleInputChange = (field: keyof Flashcard, value: string) => {
    if (currentEdit) {
      setCurrentEdit({ ...currentEdit, [field]: value });
    }
  };

  const handleSave = () => {
    if (editingIndex !== null && currentEdit) {
      const updatedFlashcards = [...flashcards];
      updatedFlashcards[editingIndex] = currentEdit;
      setFlashcards(updatedFlashcards);
      setEditingIndex(null);
      setCurrentEdit(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentEdit(null);
  };
  const title = "Capital Countries";
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.backBtn}>
        <BackBtn
          name=" "
          onClick={() => {
            Navigate("/home");
          }}
        />
      </div>
      <div className={styles.header}>
        <h1>{title}</h1>
      </div>
      <div className={styles.container}>
        {flashcards.map((card, index) => (
          <div key={index} className={styles.card}>
            {editingIndex === index ? (
              <>
                <div className={styles.frontSide}>
                  <textarea
                    value={currentEdit?.front || ""}
                    onChange={(e) => handleInputChange("front", e.target.value)}
                    className={styles.textArea}
                  />
                </div>
                <div className={styles.backSide}>
                  <textarea
                    value={currentEdit?.back || ""}
                    onChange={(e) => handleInputChange("back", e.target.value)}
                    className={styles.textArea}
                  />
                </div>
                <div className={styles.actions}>
                  <PrimaryBtn onClick={handleSave} name="save" />
                  <SecondaryBtn onClick={handleCancel} name="cancel" />
                </div>
              </>
            ) : (
              <>
                <div className={styles.cardSide}>
                  <p>{card.front}</p>
                </div>
                <div className={styles.cardSide}>
                  <p>{card.back}</p>
                </div>
                <img
                  src={icons.edit2}
                  className={styles.editbtn}
                  onClick={() => handleEditClick(index)}
                />
              </>
            )}
          </div>
        ))}
        <div
          className={styles.AddNew}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <img src="src/assets/Add.svg" alt="" />
          <p
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add a new card
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Card</h3>
            </div>
            <TextInput
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />

            <TextInput
              placeholder="Answer"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />

            <div className="modal-buttons">
              <PrimaryBtn name="Submit" onClick={handleSubmit} />
              <SecondaryBtn
                name="Cancel"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewDeck;
