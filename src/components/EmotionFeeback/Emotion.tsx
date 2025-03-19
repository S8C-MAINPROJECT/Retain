import React from "react";
import "./Emotion.css";
import axios from "axios";

interface EmotionFeedbackProps {
  onClose: () => void;
  setIsEmotionFeedbackOpen: React.Dispatch<React.SetStateAction<boolean>>; // Accept state setter
}

const EmotionFeedback: React.FC<EmotionFeedbackProps> = ({
  onClose,
  setIsEmotionFeedbackOpen
}) => {
  const emotions = [
    { emoji: "😤", label: "frustrated" },
    { emoji: "😥", label: "sad" },
    { emoji: "😊", label: "happy" },
    { emoji: "😄", label: "confident" },
    { emoji: "🤩", label: "very confident" },
  ];
  const [selectedEmotion, setSelectedEmotion] = React.useState<string | null>(
    null
  );

  const handleEmojiSelect = (label: string) => {
    setSelectedEmotion(label);
  };

  const handleSubmit = () => {
    if (selectedEmotion) {
      try {
      axios.post("http://localhost:3000/emotions", {
        emotion: selectedEmotion,
      });
      console.log("Emotion created successfully.");
    } catch (error) {
      console.error("Error creating emotion:", error);
    }
    finally {
      setIsEmotionFeedbackOpen(false);
      onClose();
     }
    } else {
      alert("Please select an emotion");
    }
  };

  return (
    <div className="emotion-feedback-overlay">
      <div className="emotion-feedback-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>How are you feeling ?</h2>
        <p>
          We would love to factor in your mood to aid your learning, select
          which describes you best
        </p>
        <div className="emojis-container">
          {emotions.map((emotion) => (
            <button
              key={emotion.label}
              className={`emoji-button ${
                selectedEmotion === emotion.label ? "selected" : ""
              }`}
              onClick={() => handleEmojiSelect(emotion.label)}
            >
              {emotion.emoji}
            </button>
          ))}
        </div>
        {selectedEmotion && (
          <div className="selected-label">{selectedEmotion}</div>
        )}
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmotionFeedback;
