import { useState, useRef } from "react";
import styles from "./Summarizer.module.css";
import axios from "axios";
import jsPDF from "jspdf";
import PrimaryBtn from "../../components/Button/PrimaryBtn";

function Summarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"brief" | "medium" | "detailed" | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleModeSelect = (selectedMode: "brief" | "medium" | "detailed") => {
    setMode(selectedMode);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      
      if (!["pdf", "png", "jpeg", "jpg"].includes(fileExtension || "")) {
        setError("Unsupported file format. Please upload a PDF, PNG, or JPEG.");
        return;
      }
      
      setFile(selectedFile);
      setSummary("");
      setError(null);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
    setSummary("");
    setError(null);
  };

  const handleGenerateSummary = async () => {
    if (!mode) {
      setError("Please select a summarization mode.");
      return;
    }

    if (!file && !youtubeUrl.trim()) {
      setError("Please upload a PDF or enter a YouTube URL.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError(null);

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mode", mode);

        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const endpoint = fileExtension === "pdf" ? "pdf" : "image";

        response = await axios.post(`http://localhost:3000/summarizer/${endpoint}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (youtubeUrl.trim()) {
        response = await axios.post("http://localhost:3000/summarizer/youtube", {
          url: youtubeUrl,
          mode,
        });
      }

      if (response && response.data.summary) {
        setSummary(response.data.summary);
      }
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!summary) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Summary", 15, 20);
    doc.setFontSize(12);
    
    const maxWidth = 180;
    const lineHeight = 7;
    const marginTop = 30;
    
    const splitSummary = doc.splitTextToSize(summary, maxWidth);
    splitSummary.forEach((line: string | string[], index: number) => {
      doc.text(line, 15, marginTop + index * lineHeight);
    });

    doc.save("summary.pdf");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleGoBack = () => {
    setFile(null);
    setYoutubeUrl("");
    setSummary("");
    setMode(null);
    setError(null);
  };

  return (
    <div className={styles.summarizerContainer}>
      <h2>Summarize Anything</h2>

      <div className={styles.container}>
        {!summary && !loading ? (
          <div className={styles.inputContainer}>
            <div className={styles.AddNew} onClick={handleClick}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpeg,.jpg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <img src="src/assets/Add.svg" alt="Add PDF or Image" />
              <p>{file ? `Uploaded: ${file.name}` : "Click to add a PDF or Image"}</p>
            </div>
            <div className={styles.or}>or</div>
          
            <input
              type="text"
              placeholder="Enter a YouTube link"
              value={youtubeUrl}
              onChange={handleUrlChange}
              className={styles.inputField}
            />

            <div className={styles.buttonGroup}>
              <button
                className={mode === "brief" ? styles.selected : ""}
                onClick={() => handleModeSelect("brief")}
              >
                Brief
              </button>
              <button
                className={mode === "medium" ? styles.selected : ""}
                onClick={() => handleModeSelect("medium")}
              >
                Medium
              </button>
              <button
                className={mode === "detailed" ? styles.selected : ""}
                onClick={() => handleModeSelect("detailed")}
              >
                Detailed
              </button>
            </div>
          </div>
        ) : (
          summary && (
            <div className={styles.summaryBox}>
              <h3>Summary</h3>
              {/* Properly formatted summary with preserved line breaks */}
              <div className={styles.summaryText}>
                {summary.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <button className={styles.downloadButton} onClick={handleDownloadPDF}>
                Download as PDF
              </button>
            </div>
          )
        )}
      </div>

      <div className={styles.generateContainer}>
        {summary ? (
          <PrimaryBtn name="Go Back" onClick={handleGoBack} />
        ) : (
          <button
            className={`${styles.generateButton} ${loading ? styles.bouncing : ""}`}
            onClick={handleGenerateSummary}
            disabled={loading}
          >
            <img src="src/assets/sparkles.svg" alt="Sparkles" />
            {loading ? "Generating summary..." : "Generate"}
          </button>
        )}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default Summarizer;
