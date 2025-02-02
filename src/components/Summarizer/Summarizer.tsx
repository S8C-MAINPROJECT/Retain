import { useState } from "react";
import styles from "./Summarizer.module.css";

function Summarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setSummary("");
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
    setSummary("");
  };

  const handleSummarize = (type: "brief" | "medium" | "detailed") => {
    // Simulate a summary response
    setSummary(
      `This is a ${type} summary for ${
        file ? file.name : youtubeUrl ? youtubeUrl : "your input"
      }.`
    );
  };

  return (
    <div className={styles.summarizerContainer}>
      <h2>Summarize anything</h2>

      <div className={styles.inputContainer}>
        <label className={styles.fileUpload}>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <span>Click to add a PDF</span>
        </label>

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
        <button onClick={() => handleSummarize("brief")}>Brief</button>
        <button onClick={() => handleSummarize("medium")}>Medium</button>
        <button onClick={() => handleSummarize("detailed")}>Detailed</button>
      </div>

      {summary && (
        <div className={styles.summaryBox}>
          <h3>Summary</h3>
          <p>{summary}</p>
          <button className={styles.downloadButton}>Download as PDF</button>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
