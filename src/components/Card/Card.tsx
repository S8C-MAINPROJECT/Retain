import { useState } from 'react';
import './Card.css';
import EditBtn from '../../assets/editbtn.svg';

const db = [
  { country: 'What is the capital of France?', capital: 'The capital of France is Paris' },
  { country: 'What is the capital of United States?', capital: 'The capital of United States is Washington, D.C.' },
  { country: 'What is the capital of India?', capital: 'The capital of India is New Delhi' },
  { country: 'What is the capital of Japan?', capital: 'The capital of Japan is Tokyo' },
  { country: 'What is the capital of Australia?', capital: 'The capital of Australia is Canberra' },
];

const Card = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="cardContainer">
      <div className="card" onClick={handleCardClick}>
        <div className='cardBodyContent'>
            <div className='cardHeader'>
                <p className='cardHeaderContent'><span style={{color:"rgba(255,255,255,1)"}}>2/</span><span style={{color:"rgba(177, 177, 177, 1)"}}>11</span></p>
                <img src={EditBtn} alt="Edit Button" id='editbtn' className='cardHeaderContent'/>
            </div>
            <h2 className="question">{db[0].country}</h2>
            <div className="separator"></div>
            <p className="answer">
              {showAnswer ? (
                <div className="capital">{db[0].capital}</div>
              ) : (
                <div className="tap-to-reveal">Tap to reveal answer</div>
              )}
            </p>

        </div>
      </div>
    </div>
  );
};

export default Card;
