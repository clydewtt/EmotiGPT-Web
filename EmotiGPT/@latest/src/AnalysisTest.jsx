import React, { useState } from "react";
import { analyzeSentiment } from "./SentimentAnalysis"; // Import your sentiment analysis function

const ChatBox = () => {
  const [inputText, setInputText] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Input text:", inputText);

    // Call the sentiment analysis function
    const result = await analyzeSentiment(inputText);
    setSentiment((prev) => `${result} - Updated`); // Display the result
    console.log("Sentiment state:", sentiment);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Simple ChatBox for Sentiment Analysis</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Analyze Sentiment
        </button>
      </form>

      {sentiment && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f4f4f4",
          }}
        >
          <strong>Sentiment Analysis Result:</strong>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
