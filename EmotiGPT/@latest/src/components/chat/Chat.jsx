import React, { useState, useEffect, useRef } from "react";
import ChatStyles from "./Chat.module.css";
import MessageIndicator from "../message-indicator/MessageIndicator";
import axios from "axios";
import { faPaperPlane, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AudioStream from "../chat/AudioStream";

function Chat({ detectedEmotion }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const messagesEndRef = useRef(null);

  const voiceId = "21m00Tcm4TlvDq8ikWAM";
  // const text = "Hello, this is a sample text to stream as speech.";
  const apiKey = "sk_05e2c365a8dabb27960f0a9b76ae870f7c3dfddf6271daa7";
  const voiceSettings = {
    stability: 0,
    similarity_boost: 0,
  };

  const startStreaming = async (text) => {
    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    };

    const requestBody = {
      text,
      voice_settings: voiceSettings,
    };

    try {
      const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
        headers,
        responseType: "blob",
      });

      if (response.status === 200) {
        const audio = new Audio(URL.createObjectURL(response.data));
        audio.play();
      } else {
        // setError("Error: Unable to stream audio.");
      }
    } catch (error) {
      // setError("Error: Unable to stream audio.");
    } finally {
      // setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    setIsWaitingForResponse(true)
    if (inputText.trim()) {
      const newMessage = {
        sender: "user",
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      console.log(detectedEmotion);

      try {
        const response = await axios.post("http://localhost:8000/chat", {
          user_input: inputText,
          emotion_response: detectedEmotion[0],
        });

        const receivedMessage = {
          sender: "assistant",
          text: response.data.message,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setIsWaitingForResponse(false)
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        startStreaming(response.data.message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <>
      <div className={ChatStyles.chatContainer}>
        <h3 className={ChatStyles.chatTitle}>Chat with Moti</h3>
        <div className={ChatStyles.chatDivider}></div>
        <div className={ChatStyles.messagesContainer}>
          {messages.map((msg, index) => (
            <div key={index} className={ChatStyles.messageContainer}>
              <span
                className={`${ChatStyles.messageInfo} ${
                  msg.sender === "user"
                    ? ChatStyles.userMessageInfo
                    : ChatStyles.botMessageInfo
                }`}
              >
                {msg.sender === "user" ? "You" : "Moxi"} - {msg.timestamp}
              </span>
              <div
                className={`${ChatStyles.message} ${
                  msg.sender === "user"
                    ? ChatStyles.userMessage
                    : ChatStyles.botMessage
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Empty div to keep track of the end of messages */}
          <div ref={messagesEndRef} />
        </div>
        {isWaitingForResponse && <MessageIndicator />}
        <div className={ChatStyles.inputContainer}>
          <div className={ChatStyles.inputInnerContainer}>
            <input
              type="text"
              placeholder="Message Moti"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={ChatStyles.inputField}
            />
            <button onClick={handleSend} className={ChatStyles.sendButton}>
              Send
            </button>
            {/* <FontAwesomeIcon icon={faPaperPlane} size="xl" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
