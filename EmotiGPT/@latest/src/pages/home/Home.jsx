import React from "react";
import HomeStyles from "./Home.module.css";
import RealTimeEmotionDetection from "../../components/camera/Camera";
import Chat from "../../components/chat/Chat";
import emoti_gpt_logo from "../../assets/emoti_gpt_logo.png";

function Home() {
  return (
    <>
      <div className={HomeStyles.pageContainer}>
        <div className={HomeStyles.menuContainer}>
          <img
            src={emoti_gpt_logo}
            alt="EmotiGPT Logo"
            style={{ width: "3rem", height: "auto" }}
          />
          Menu Placeholder
        </div>
        <div className={HomeStyles.cameraContainer}>
          <h3 className={HomeStyles.pageTitle}>EmotiGPT 1.0v</h3>
          <RealTimeEmotionDetection />
        </div>
        <div className={HomeStyles.chatContainer}>
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Home;
