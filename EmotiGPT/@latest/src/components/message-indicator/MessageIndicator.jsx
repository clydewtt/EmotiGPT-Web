import React from "react";
import "./MessageIndicator.css"; // Import the CSS file for styling

const MessageIndicator = () => {
  return (
    <div className="message-indicator">
      <p>Moti is typing</p>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default MessageIndicator;
