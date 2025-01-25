import { ChangeEvent, useState } from "react";
import icons from "../../assets/icons";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../../components/Input/textInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import HomeCard from "../../components/HomeCard/HomeCard";
import {AddNew} from "../../components/AddNew/AddNew";
// import { YoutubeTranscript } from "youtube-transcript";  

type UploadStatus = "idle" | "uploading" | "success" | "error";

const Home = () => {

  const [deckTitle, setDeckTitle] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [decks, setDecks] = useState<Array<{ title: string, completed: number, total: number }>>([
    { title: "Capital Countries", completed: 3, total: 11 }
  ]);
  const [deck2, setDeck2] = useState<Array<{ title: string, completed: number, total: number }>>([
    { title: "Capital Countries", completed: 3, total: 11 },
    { title: "Something Important", completed: 3, total: 11 }
  ]);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  const [show, setShow] = useState(false);
  const [text, setText] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [deck, setDeck] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  // const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [youtubeLink, setYoutubeLink] = useState<string>(""); // Holds the YouTube link
  const [showDialog, setShowDialog] = useState<boolean>(false); // Controls dialog visibility

  const navigate = useNavigate();


  const handleDeckSubmit = () => {
    if (deckTitle && totalQuestions) {
      setDecks([...decks, {
        title: deckTitle,
        completed: 0,
        total: parseInt(totalQuestions)
      }]);
      setDeckTitle('');
      setTotalQuestions('');
      setIsDeckModalOpen(false);
    }
  };

  const handleDeleteDeck = (index: number) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      setDecks(decks.filter((_, i) => i !== index));
    }
  };


  // TESTING!!!
  //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       setFile(e.target.files[0]);
  //       console.log("File uploaded:", e.target.files[0].name);
  //     }
  //   }

  //   const handleFileUpload = async () => {
  //     if(!file) return;
  //     setStatus('uploading');
  //     setUploadProgress(0);
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       await axios.post("https://httpbin.org/post", formData, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress: (progressEvent) => {
  //         const progress = progressEvent.total ? Math.round((progressEvent.loaded*100)/progressEvent.total) : 0;
  //         setUploadProgress(progress);
  //       },
  //       });
  //       setStatus('success');
  //       setUploadProgress(100);
  //     } catch (error) {
  //       setStatus('error');
  //       setUploadProgress(0);
  //     }
  //   }

  // File input handlers

  // Handle PDF
  const handlePdf = (e: ChangeEvent<HTMLInputElement>) => {
    const PdfFile = e.target.files?.[0];
    if (PdfFile) {
      setPdf(PdfFile);
      console.log("PDF uploaded:", PdfFile.name);
    }
  };

  const handlePdfUpload = async () => {
    if (!pdf) return;
    setStatus("uploading");
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
      await axios.post("http://localhost:3000/api/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch (error) {
      setStatus("error");
      setUploadProgress(0);
    }
  };

  // Handle Text
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const TextFile = e.target.files?.[0];
    if (TextFile) {
      setText(TextFile);
      console.log("Text file uploaded:", TextFile.name);
    }
  };

  const handleTextUpload = async () => {
    if (!text) return;
    setStatus("uploading");
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("text", text);

    try {
      await axios.post("https://localhost:3000/api/text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch (error) {
      setStatus("error");
      setUploadProgress(0);
    }
  };

  // Handle Deck
  const handleDeck = (e: ChangeEvent<HTMLInputElement>) => {
    const DeckFile = e.target.files?.[0];
    if (DeckFile) {
      setDeck(DeckFile);
      console.log("Deck file uploaded:", DeckFile.name);
    }
  };

  const handleDeckUpload = async () => {
    if (!deck) return;
    setStatus("uploading");
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("deck", deck);

    try {
      await axios.post("https://localhost:3000/api/deck", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch (error) {
      setStatus("error");
      setUploadProgress(0);
    }
  };

  //   // Fetch the transcript
  //   const transcript = await YoutubeTranscript.fetchTranscript(videoId);

  //   if (!transcript || transcript.length === 0) {
  //     alert("Transcript not available for this video.");
  //     setStatus("error");
  //     return;
  //   }

  //   // Prepare transcript for sending
  //   const formattedTranscript = transcript.map((entry) => entry.text).join(" ");

  //   // Send the transcript to the backend
  //   await axios.post("https://your-backend-endpoint.com/api/transcript", {
  //     transcript: formattedTranscript,
  //     videoId,
  //   });

  //   setStatus("success");
  //   console.log("Transcript sent to the backend successfully.");
  //   console.log("Transcript:", formattedTranscript);
  // } catch (error) {
  //   console.error("Error fetching or sending transcript:", error);
  //   setStatus("error");
  // } finally {
  //   setShowDialog(false); // Close the dialog after the operation
  //   setYoutubeLink(""); // Clear the input field
  // }
  // };

  // Handle YouTube Upload
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

  // const [question, setQuestion] = useState('');
  // const [answer, setAnswer] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleSubmit = () => {
  //   // Handle the submission logic here
  //   setIsModalOpen(false);
  // };



  return (
    <div className="home">
      {/* Header */}
      <div className="homeHeader">
        <div className="logo">
          <img src={icons.retainSymbol} alt="Retain Logo" />
          <span className="home-heading">Retain
          </span>
        </div>
        <div className="logout">logout</div>
      </div>
      <h3>Welcome Back! you got <span id="no_lessons">3</span> lessons to review</h3>

        <div className="decks">
          {decks.map((deck, index) => (
            <HomeCard
              key={index}
              title={deck.title}
              completed={deck.completed}
              total={deck.total}
              onDelete={() => handleDeleteDeck(index)}
              path="src/assets/jjj.webp"
            />
          ))}
        </div>
        <h3>All Decks</h3>
        <div className="decks">
          {deck2.map((deck2, index) => (
            <HomeCard
              key={index}
              title={deck2.title}
              completed={deck2.completed}
              total={deck2.total}
              onDelete={() => handleDeleteDeck(index)}
              path="src/assets/jjj.webp"
            />
          ))}
          <AddNew onManual={() => setIsDeckModalOpen(true)} />
        </div>

      {/* Upload Options */}
      {show && (
        <div className="uploadOptions">
          {/* Upload Text */}
          <button
            className="uploadButton"
            onClick={() => document.getElementById("textUpload")?.click()}
          >
            <img src={icons.addText} alt="Upload Text" />
          </button>
          <input
            type="file"
            id="textUpload"
            style={{ display: "none" }}
            accept=".txt"
            onChange={handleText}
          />

          {/* Upload PDF */}
          <button
            className="uploadButton"
            onClick={() => document.getElementById("pdfUpload")?.click()}
          >
            <img src={icons.addPDF} alt="Upload PDF" />
          </button>
          <input
            type="file"
            id="pdfUpload"
            style={{ display: "none" }}
            accept="application/pdf"
            onChange={handlePdf}
          />

          {/* Upload Deck */}
          <button
            className="uploadButton"
            onClick={() => setIsDeckModalOpen(true)}
          >
            <img src={icons.addDeck} alt="Upload Deck" />
          </button>

          <input
            type="file"
            id="deckUpload"
            style={{ display: "none" }}
            accept=".deck"
            onChange={handleDeck}
          />

          {/* Upload YouTube Transcript */}
          <button
            className="uploadButton"
            onClick={() => setShowDialog(true)}
          >
            <img src={icons.addYoutube} alt="Upload YouTube" />
          </button>

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
                  <button
                    className="dialogButton"
                    onClick={handleYoutubeUpload}
                  >
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
      )}

      {isDeckModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Deck</h3>
            </div>
            <TextInput
              placeholder="Deck Title"
              onChange={(e) => setDeckTitle(e.target.value)}
              value={deckTitle}
            />
            <TextInput
              placeholder="Number of Questions"
              onChange={(e) => setTotalQuestions(e.target.value)}
              value={totalQuestions}
            />
            <div className="modal-buttons">
              <PrimaryBtn
                name="Create"
                onClick={handleDeckSubmit}
              />
              <SecondaryBtn
                name="Cancel"
                onClick={() => setIsDeckModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}


      {/* Footer */}
      <div className="homeFooter">
        <div className="homeFooter-button">
          <img
            src={show ? icons.boldcross : icons.plusSymbol}
            alt={show ? "Close Options" : "Open Options"}
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
    </div >
  );
};

export default Home;
