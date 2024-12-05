import React from "react";
import { motion } from "framer-motion";
import "./Alert.css";

const Alert = ({ message, isVisible, onClose }) => {
  return (
    isVisible && (
      <motion.div
        className="alert-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onAnimationComplete={() => {
          // Automatically close alert after animation ends
          setTimeout(onClose, 3000);
        }}
      >
        <div className="alert">
          <span className="alert-message">{message}</span>
          <button className="alert-close" onClick={onClose}>
            ✖
          </button>
        </div>
      </motion.div>
    )
  );
};

export default Alert;
