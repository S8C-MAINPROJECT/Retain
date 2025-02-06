import { ChangeEvent, useRef, useState } from "react";
import "./AddNew.css";
import axios from "axios";

interface AddNewProps {
  onManual: () => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const AddNew: React.FC<AddNewProps> = ({ onManual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdf, setPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log("isOpen:", isOpen);
  };

  const fileInputImageRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      // You can add image type validation here if needed
      setPdf(imageFile); // Still using setPdf for simplicity, consider renaming if handling PDF and Image differently later
      console.log("Image uploaded:", imageFile.name);
    }
  };
  const handlePdf = (e: ChangeEvent<HTMLInputElement>) => {
    const PdfFile = e.target.files?.[0];
    if (PdfFile) {
      setPdf(PdfFile);
      console.log("PDF uploaded:", PdfFile.name);
    }
  };

  const handleYoutubeUpload = async () => {
    if (!youtubeLink.trim()) {
      alert("Please enter a valid YouTube link.");
      return;
    }

    setStatus("uploading");

    try {
      // Extract video ID from the link
      const videoIdMatch = youtubeLink.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) {
        alert("Invalid YouTube link. Please provide a valid link.");
        setStatus("error");
        return;
      }

      // Post the YouTube link to the backend
      await axios.post("https://localhost:3000/api/youtube-summary/summarize", {
        youtubeLink,
      });

      setStatus("success");
      console.log("YouTube link sent to the backend successfully.");
      console.log("YouTube Link:", youtubeLink);
    } catch (error) {
      console.error("Error sending YouTube link:", error);
      setStatus("error");
    } finally {
      setShowDialog(false); // Close the dialog after the operation
      setYoutubeLink(""); // Clear the input field
    }
  };
  const handleClickNope = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleManual = () => {
    onManual();
    setIsOpen(false);
  };
  return (
    <div className="AddNew" onClick={handleClick}>
      <img src="src/assets/Add.svg" alt="" />
      <p onClick={handleClick}>Add a new deck</p>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClick}>
          <div className="modal-content" onClick={handleClickNope}>
            <div className="modal-header">
              <h3>Add New Deck</h3>
            </div>
            <div className="modal-box-container">
              <div
                className="modal-box"
                onClick={() => {
                  handleClick();
                  setShowDialog(true);
                }}
              >
                <img src="src/assets/addYoutube.svg" alt="" />
                Youtube link
              </div>
              <div
                className="modal-box"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                <img src="src/assets/addPDF.svg" alt="" />
                Upload a pdf
                <input // Hidden file input
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={handlePdf}
                  ref={fileInputRef}
                />
              </div>
              <div
                className="modal-box"
                onClick={() => {
                  fileInputImageRef.current?.click();
                }}
              >
                <img src="src/assets/addText.svg" alt="" />
                Upload an image
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept=".png,.jpg,.jpeg"
                  onChange={handleImage}
                  ref={fileInputImageRef}
                />
              </div>
              <div className="modal-box" onClick={handleManual}>
                <img src="src/assets/addDeck.svg" alt="" />
                Add manually
              </div>
            </div>
          </div>
        </div>
      )}
      {showDialog && (
        <div className="dialogOverlay">
          <div className="dialogBox">
            <h3>Enter YouTube Link</h3>
            <input
              type="text"
              className="youtubeInput"
              placeholder="Paste your YouTube link here..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <div className="dialogActions">
              <button className="dialogButton" onClick={handleYoutubeUpload}>
                Submit
              </button>
              <button
                className="dialogButton cancel"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const handlePdfUpload = async () => {
//   if (!pdf) return;
//   setStatus("uploading");
//   setUploadProgress(0);
//   const formData = new FormData();
//   formData.append("pdf", pdf);

//   try {
//     await axios.post("http://localhost:3000/api/file", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       onUploadProgress: (progressEvent) => {
//         const progress = progressEvent.total
//           ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           : 0;
//         setUploadProgress(progress);
//       },
//     });
//     setStatus("success");
//     setUploadProgress(100);
//   } catch (error) {
//     setStatus("error");
//     setUploadProgress(0);
//   }
// };
