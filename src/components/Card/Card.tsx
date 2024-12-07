import React, { useState } from 'react';

interface CardProps {
  question: string;
  answer: string;
}

const Card: React.FC<CardProps> = ({ question, answer }) => {
  const [revealed, setRevealed] = useState(false);

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#292929",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
  };

  const questionStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const answerStyle: React.CSSProperties = {
    fontSize: "14px",
    opacity: 0.7,
  };

  return (
    <div
      style={cardStyle}
      onClick={() => setRevealed(!revealed)}
    >
      {/* Question */}
      <div style={questionStyle}>
        {question}
      </div>

      {/* Conditional Rendering for the Answer */}
      <div style={answerStyle}>
        {revealed ? answer : "Tap to reveal answer"}
      </div>
    </div>
  );
};

export default Card;
