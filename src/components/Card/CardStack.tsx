import React from 'react';
import Card from './Card';

const cardData = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of Germany?", answer: "Berlin" },
  { question: "What is the capital of Italy?", answer: "Rome" },
  { question: "What is the capital of Spain?", answer: "Madrid" },
  // Add more cards as needed
];

const CardStack: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "300px",
    width: "300px",
  };

  const positionStyles = [
    { transform: "translateY(0px)", zIndex: 3 },
    { transform: "translateY(20px)", zIndex: 2 },
    { transform: "translateY(40px)", zIndex: 1 },
  ];

  return (
    <div style={containerStyle}>
      {cardData.slice(0, 3).map((card, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transition: "all 0.3s ease",
            ...positionStyles[index],
          }}
        >
          <Card question={card.question} answer={card.answer} />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
