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
  const conversations = [
    { name: "Temp Convo 1", date: new Date() }, // Today
    { name: "Temp Convo 2", date: new Date(Date.now() - 86400000) }, // Yesterday
    { name: "Temp Convo 3", date: new Date(Date.now() - 3 * 86400000) }, // Last 3 days
    { name: "Temp Convo 4", date: new Date(Date.now() - 7 * 86400000) }, // Last week
    { name: "Temp Convo 5", date: new Date(Date.now() - 14 * 86400000) }, // Older
  ];

  const categorizedConversations = categorizeConversations(conversations);

  return (
    <div className={HomeStyles.pageContainer}>
      <div className={HomeStyles.menuContainer}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <img
            src={emoti_gpt_logo}
            alt="EmotiGPT Logo"
            style={{ width: "4rem", height: "auto", marginBottom: "1rem" }}
          />
        </div>

        {Object.entries(categorizedConversations).map(([category, convos]) => (
          <div key={category} className={HomeStyles.conversationContainer}>
            <p className={HomeStyles.categoryTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            {convos.map((convo, index) => (
              <div key={index} className={HomeStyles.menuListItem}>
                <p>{convo.name}</p>
              </div>
            ))}
          </div>
        ))}
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
