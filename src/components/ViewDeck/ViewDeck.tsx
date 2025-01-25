import React, { useState, useEffect } from "react";
import styles from "./ViewDeck.module.css";

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
  return (
    <>
      <div className={styles.header}>Total Cards: {title}</div>
      <div className={styles.container}>
        {flashcards.map((card, index) => (
          <div key={index} className={styles.card}>
            {editingIndex === index ? (
              <>
                <div className={styles.cardSide}>
                  <h3>Front</h3>
                  <textarea
                    value={currentEdit?.front || ""}
                    onChange={(e) => handleInputChange("front", e.target.value)}
                    className={styles.textArea}
                  />
                </div>
                <div className={styles.cardSide}>
                  <h3>Back</h3>
                  <textarea
                    value={currentEdit?.back || ""}
                    onChange={(e) => handleInputChange("back", e.target.value)}
                    className={styles.textArea}
                  />
                </div>
                <div className={styles.actions}>
                  <button onClick={handleSave} className={styles.saveButton}>
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={styles.cardSide}
                  onClick={() => handleEditClick(index)}
                >
                  <h3>Front</h3>
                  <p>{card.front}</p>
                </div>
                <div
                  className={styles.cardSide}
                  onClick={() => handleEditClick(index)}
                >
                  <h3>Back</h3>
                  <p>{card.back}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewDeck;
