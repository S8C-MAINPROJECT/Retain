import React, { useState } from 'react';
import TextInput from '../Input/textInput';
import PrimaryBtn from '../Button/PrimaryBtn';
import SecondaryBtn from '../Button/secondaryBtn';
import './AddCardModal.css';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: string, answer: string) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(question, answer);
    setQuestion('');
    setAnswer('');
  };

  if (!isOpen) return null;

  return (
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
          <PrimaryBtn
            name="Submit"
            onClick={handleSubmit}
          />
          <SecondaryBtn
            name="Cancel"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
