import { useState, useEffect } from "react";
import styles from "./ViewDeck.module.css";
import "../HomeCard/HomeCard.css";
import icons from "../../assets/icons";
import BackBtn from "../Button/backBtn";
import TextInput from "../Input/textInput";
import PrimaryBtn from "../Button/PrimaryBtn";
import SecondaryBtn from "../Button/secondaryBtn";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface Flashcard {
  fid: string; // Add this line
  question: string;
  answer: string;
}

const ViewDeck = () => {
  const location = useLocation();
  const { did, title } = location.state ?? { did: null, title: "Untitled" };
  if (!did) {
    console.error("Invalid deck ID");
    return;
  }
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentEdit, setCurrentEdit] = useState<Flashcard | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (did) {
      axios
        .get(`http://localhost:3000/flashcards/${did}`)
        .then((response) => {
          setFlashcards(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flashcards:", error);
          setFlashcards([]);
        });
    }
  }, [did]); // Change dependency from `title` to `did`
  

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
  
      axios
        .patch(
          `http://localhost:3000/flashcards/update/${flashcards[editingIndex].fid}`,
          {
            question: currentEdit.question,
            answer: currentEdit.answer,
          }
        )
        .then((response) => {
          console.log("Flashcard updated successfully", response.data);
        })
        .catch((error) => {
          console.error("Error updating flashcard:", error);
        });
    }
  };
  

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentEdit(null);
  };

  const handleSubmit = () => {
    const newFlashcard: Flashcard = { 
      fid: Date.now().toString(), // Temporary ID until backend assigns one
      question, 
      answer 
    };
  
    setFlashcards([...flashcards, newFlashcard]);
  
    axios
      .post(`http://localhost:3000/flashcards/create`, {
        question,
        answer,
        did,
      })
      .then((response) => {
        console.log("Flashcard added successfully", response.data);
      })
      .catch((error) => {
        console.error("Error adding flashcard:", error);
      });
  
    setIsModalOpen(false);
    setQuestion("");
    setAnswer("");
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
        <h1>{}</h1>
      </div>

      <div className={styles.container}>
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
        {flashcards.map((card, index) => (
          <div key={index} className={styles.card}>
            {editingIndex === index ? (
              <>
                <div className={styles.frontSide}>
                  <textarea
                    value={currentEdit?.question || ""}
                    onChange={(e) =>
                      handleInputChange("question", e.target.value)
                    }
                    className={styles.textArea}
                  />
                </div>
                <div className={styles.backSide}>
                  <textarea
                    value={currentEdit?.answer || ""}
                    onChange={(e) =>
                      handleInputChange("answer", e.target.value)
                    }
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
                  <p>{card.question}</p>
                </div>
                <div className={styles.cardSide}>
                  <p>{card.answer}</p>
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
};

export default ViewDeck;
