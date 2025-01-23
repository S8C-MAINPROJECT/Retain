import { useState } from 'react'
import './AddNew.css';

interface AddNewProps {
  onManual: () => void;
}

export const AddNew : React.FC<AddNewProps> = ({ onManual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!(isOpen))
    console.log("isOpen:", isOpen);

  }

  const handleClickNope = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
  }

  const handleManual = () => {
    onManual()
    setIsOpen(false)
  }
  return (
    <div className='AddNew'onClick={handleClick}>
      <img src="src/assets/Add.svg" alt=""/>
      <p onClick={handleClick}>Add a new deck</p>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClick}>
          <div className="modal-content"onClick={handleClickNope}>
            <div className="modal-header">
              <h3>Add New Deck</h3>
            </div>
            <div className='modal-box-container'>
            <div className='modal-box'>
              <img src="src/assets/addYoutube.svg" alt="" />
              Youtube link
            </div>
            <div className='modal-box'>
              <img src="src/assets/addPDF.svg" alt="" />
              Upload a pdf 
              </div>
              <div className='modal-box'>
              <img src="src/assets/addText.svg" alt="" />
            Upload txt file 
              </div>
              <div className='modal-box' onClick={handleManual}>
              <img src="src/assets/addDeck.svg" alt="" />
            Add manually 
              </div>
              </div>
            </div>
          </div>
      )}
    </div>
  )
}
