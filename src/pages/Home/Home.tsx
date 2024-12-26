import { ChangeEvent, useState } from "react";
import icons from "../../assets/icons";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const Home = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [deck, setDeck] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [youtubeLink, setYoutubeLink] = useState<string>(""); // Holds the YouTube link
  const [showDialog, setShowDialog] = useState<boolean>(false); // Controls dialog visibility

  const navigate = useNavigate();

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
      await axios.post("https://httpbin.org/post", formData, {
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
      await axios.post("https://httpbin.org/post", formData, {
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
      await axios.post("https://httpbin.org/post", formData, {
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



// Handle YouTube Upload
const handleYoutubeUpload = async () => {
  if (!youtubeLink.trim()) {
    alert("Please enter a valid YouTube link.");
    return;
  }

  setStatus("uploading");

  try {
    // Simulate API call for processing YouTube link
    await axios.post("https://httpbin.org/post", { youtubeLink });
    setStatus("success");
    console.log("YouTube link uploaded:", youtubeLink);
  } catch (error) {
    setStatus("error");
    console.error("Error uploading YouTube link:", error);
  } finally {
    setShowDialog(false); // Close the dialog after the operation
    setYoutubeLink(""); // Clear the input field
  }
};


  return (
    <div className="home">
      {/* Header */}
      <div className="homeHeader">
        <img src={icons.retainSymbol} alt="Retain Logo" />
        <span className="home-heading">
          <p>Retain</p>
        </span>
      </div>

      {/* Card */}
      <div className="homeCard" onClick={() => navigate("/card")}>
        <div className="homeCard-items">
          <div className="left-side-items"></div>
          <div className="right-side-items">
            <div>
              <h5>Capital Countries</h5>
            </div>
            <div>
              <p>Today: 3/11</p>
            </div>
            <div className="pgBar-home">
              <ProgressBar
                progress={1}
                total={5}
                activecolor="rgba(81, 197, 70, 1)"
                deactivecolor="rgba(171, 250, 164, 1)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TESTING!!! */}
      {/* <div className="space-y-2">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        {file && (
          <div className="mb-4 text-sm">
            <p>File Name: {file.name}</p>
            <p>File Size: {(file.size/1024).toFixed(2)} KB</p>
            <p>File Type: {file.type}</p>
          </div>
        )}

        {status === 'uploading' && (
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div className="h-2.5 rounded-full bg-blue-600 transition-all duration-300" style={{width: `${uploadProgress}%`}}></div>
            </div>
            <p className="text-sm text-gray-600">{uploadProgress}%uploaded</p>
          </div>
        )}

        {file && status!= "uploading" && 
          <button onClick={handleFileUpload}>Upload</button>
        }
        {status === 'success' && (
          <p className="text-sm text-green-600">
            File uploaded successfully!
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600">
            Error uploading file. Please try again.
          </p>
        )}
      </div> */}

      {/* Upload Options */}
      {show && (
        <div className="uploadOptions">
          <div className="optionDisplayArea">
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
              onClick={() => document.getElementById("deckUpload")?.click()}
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
    </div>
  );
};

export default Home;
