import React, { useState, useEffect } from "react";
import HomeStyles from "./Home.module.css";
import RealTimeEmotionDetection from "../../components/camera/Camera";
import Chat from "../../components/chat/Chat";
import emoti_gpt_logo from "../../assets/emoti_gpt_logo.png";

// Helper function to categorize conversations by date
function categorizeConversations(conversations) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return {
    today: conversations.filter(
      (convo) => convo.date.toDateString() === today.toDateString()
    ),
    yesterday: conversations.filter(
      (convo) => convo.date.toDateString() === yesterday.toDateString()
    ),
    lastWeek: conversations.filter(
      (convo) =>
        convo.date > lastWeek &&
        convo.date.toDateString() !== today.toDateString() &&
        convo.date.toDateString() !== yesterday.toDateString()
    ),
    older: conversations.filter((convo) => convo.date <= lastWeek),
  };
}

function Home() {
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [emotionHistory, setEmotionHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentEmotion && currentEmotion[0]) {
        setEmotionHistory((prev) => [
          {
            emotion: currentEmotion[0],
            confidence: (currentEmotion[1] * 100).toFixed(2),
            time: new Date(),
          },
          ...prev,
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentEmotion]);

  return (
    <div className={HomeStyles.pageContainer}>
      <div className={HomeStyles.historyContainer}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <img
            src={emoti_gpt_logo}
            alt="EmotiGPT Logo"
            style={{ width: "4rem", height: "auto", marginBottom: "1rem" }}
          />
        </div>
        
        <h3>Emotion History</h3>
        <div className={HomeStyles.historyList}>
          {emotionHistory.length > 0 ? (
            emotionHistory.map((entry, index) => (
              <div key={index} className={HomeStyles.historyItem}>
                <p>
                  <strong>Emotion:</strong> {entry.emotion}
                </p>
                <p>
                  <strong>Confidence:</strong> {entry.confidence}%
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {entry.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          ) : (
            <p>No emotions detected yet.</p>
          )}
        </div>
      </div>

      <div className={HomeStyles.chatContainer}>
        <Chat detectedEmotion={currentEmotion} />
      </div>

      <div className={HomeStyles.cameraContainer}>
        <h3 className={HomeStyles.pageTitle}>EmotiGPT 1.0v</h3>
        <RealTimeEmotionDetection onEmotionDetected={setCurrentEmotion} />
      </div>
    </div>
  );
}

export default Home;
