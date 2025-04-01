import { ChangeEvent, useRef, useState, useEffect } from "react";
import "./AddNew.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Oval } from "react-loader-spinner";

interface AddNewProps {
  onManual: () => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const AddNew: React.FC<AddNewProps> = ({ onManual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdf, setPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputImageRef = useRef<HTMLInputElement>(null);
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uid, setUid] = useState<number | null>(null);

  const getUidFromToken = (token: string) => {
    console.log(token);
    const decoded: { id: number } = jwtDecode(token);
    console.log(decoded.id);
    return decoded.id;
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUid(getUidFromToken(token));
    }
  }, []);

  if (!uid) {
    return (
      <div>
        <p>Loading user ID...</p>
      </div>
    );
  }

  // 📸 Handle Image Upload
  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      setPdf(imageFile);
      console.log("Image uploaded:", imageFile.name);
    }
    setStatus("uploading");
    // const deckId = await fetchDeckNumber();

    try {
      const formData = new FormData();
      formData.append("image", imageFile as Blob); // Keep "image" as key to match backend
      formData.append("count", "5");
      formData.append("uid", uid.toString());
      // formData.append("deckId", deckId.toString());

      await axios.post(
        "http://localhost:3000/question-answer/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setStatus("success");
      console.log("Image posted successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus("error");
    } finally {
      setIsOpen(false);
    }
    window.location.reload();
  };

  // 📄 Handle PDF Upload
  const handlePdf = async (e: ChangeEvent<HTMLInputElement>) => {
    setStatus("uploading");
    const PdfFile = e.target.files?.[0];
    if (PdfFile) {
      setPdf(PdfFile);
      console.log("PDF uploaded:", PdfFile.name);
    }

    // const deckId = await fetchDeckNumber();

    try {
      const formData = new FormData();
      formData.append("pdf", PdfFile as Blob); // Keep "pdf" as key to match backend
      formData.append("count", "5");
      formData.append("uid", uid.toString());
      // formData.append("deckId", deckId.toString());

      await axios.post("http://localhost:3000/question-answer/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("PDF posted successfully");
      setStatus("success");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setStatus("error");
    } finally {
      setIsOpen(false);
      window.location.reload();
    }
  };

  // Handle YouTube Upload
  const handleYoutubeUpload = async () => {
    setShowDialog(false);
    if (!youtubeLink.trim()) {
      alert("Please enter a valid YouTube link.");
      return;
    }
    setStatus("uploading");
    // const deckId = await fetchDeckNumber();
    try {
      await axios.post(
        "http://localhost:3000/question-answer/youtube",
        {
          url: youtubeLink,
          count: 5,
          uid: uid,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setStatus("success");
      console.log("YouTube link posted successfully.");
    } catch (error) {
      console.error("Error sending YouTube link:", error);
      setStatus("error");
    } finally {
      setYoutubeLink("");
      setIsOpen(false);
      setShowDialog(false);
    }
    window.location.reload();
  };

  const handleManual = () => {
    onManual();
    setIsOpen(false);
  };

  return (
    <div
      className="AddNew"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <img src="src/assets/Add.svg" alt="" />
      <p>Add a new deck</p>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Deck</h3>
            </div>
            {status === "uploading" ? (
              <div
                className="modal-box-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3>uploading and generating</h3>
                <Oval
                  height={60}
                  width={60}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : (
              <>
                <div className="modal-box-container">
                  <div
                    className="modal-box"
                    onClick={() => setShowDialog(true)}
                  >
                    <img src="src/assets/addYoutube.svg" alt="" />
                    Youtube link
                  </div>
                  <div
                    className="modal-box"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <img src="src/assets/addPDF.svg" alt="" />
                    Upload a pdf
                    <input
                      type="file"
                      accept=".pdf"
                      style={{ display: "none" }}
                      onChange={handlePdf}
                      ref={fileInputRef}
                    />
                  </div>
                  <div
                    className="modal-box"
                    onClick={() => fileInputImageRef.current?.click()}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  Close
                </button>
              </>
            )}
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
                onClick={() => {
                  setShowDialog(false);
                }}
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

