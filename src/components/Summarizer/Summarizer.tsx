// import { useState, useRef } from "react";
// import styles from "./Summarizer.module.css";

// function Summarizer() {
//   const [file, setFile] = useState<File | null>(null);
//   const [youtubeUrl, setYoutubeUrl] = useState<string>("");
//   const [summary, setSummary] = useState<string>("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//       setSummary("");
//     }
//   };

//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setYoutubeUrl(event.target.value);
//     setSummary("");
//   };

//   const handleSummarize = (type: "brief" | "medium" | "detailed") => {
//     // Simulate a summary response
//     setSummary(
//       `This is a ${type} summary for ${
//         file ? file.name : youtubeUrl ? youtubeUrl : "your input"
//       }.`
//     );
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   return (
//     <div className={styles.summarizerContainer}>
//       <h2>Summarize anything</h2>

//       <div className={styles.inputContainer}>
//         <div className={styles.AddNew} onClick={handleClick}>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".pdf"
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//           <img src="src/assets/Add.svg" alt="" />
//           <p>Click to add a pdf</p>
//         </div>
//         <div className={styles.or}>or</div>

//         <input
//           type="text"
//           placeholder="Enter a YouTube link"
//           value={youtubeUrl}
//           onChange={handleUrlChange}
//           className={styles.inputField}
//         />
//       </div>

//       <div className={styles.buttonGroup}>
//         <button onClick={() => handleSummarize("brief")}>Brief</button>
//         <button onClick={() => handleSummarize("medium")}>Medium</button>
//         <button onClick={() => handleSummarize("detailed")}>Detailed</button>
//       </div>

//       {summary && (
//         <div className={styles.summaryBox}>
//           <h3>Summary</h3>
//           <p>{summary}</p>
//           <button className={styles.downloadButton}>Download as PDF</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Summarizer;

import { useState, useRef } from "react";
import styles from "./Summarizer.module.css";
import axios from "axios";

function Summarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"brief" | "medium" | "detailed" | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
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

        response = await axios.post(
          "http://localhost:3000/summarizer/pdf",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else if (youtubeUrl.trim()) {
        response = await axios.post(
          "http://localhost:3000/summarizer/youtube",
          {
            url: youtubeUrl,
            mode,
          }
        );
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.summarizerContainer}>
      <h2>Summarize Anything</h2>

      <div className={styles.inputContainer}>
        <div className={styles.AddNew} onClick={handleClick}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <img src="src/assets/Add.svg" alt="Add PDF" />
          <p>Click to add a PDF</p>
        </div>
        <div className={styles.or}>or</div>

        <input
          type="text"
          placeholder="Enter a YouTube link"
          value={youtubeUrl}
          onChange={handleUrlChange}
          className={styles.inputField}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={mode === "brief" ? styles.active : ""}
          onClick={() => setMode("brief")}
        >
          Brief
        </button>
        <button
          className={mode === "medium" ? styles.active : ""}
          onClick={() => setMode("medium")}
        >
          Medium
        </button>
        <button
          className={mode === "detailed" ? styles.active : ""}
          onClick={() => setMode("detailed")}
        >
          Detailed
        </button>
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.generateButton}
          onClick={handleGenerateSummary}
          disabled={loading}
        >
          {loading ? "Generating summary..." : "Generate"}
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {summary && (
        <div className={styles.summaryBox}>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
