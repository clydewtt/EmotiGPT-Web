import { useRef, useEffect, useState } from "react";
import CameraStyles from "./Camera.module.css";
import * as faceapi from "face-api.js";
import { EmotionType } from "../../constants/EmotionTypes";
import { motion } from "framer-motion";

const EMOTION_TYPES = Object.values(EmotionType);

const EMOTION_EMOJI_MAP = {
  "neutral": "😐",
  "happy": "😊",
  "sad": "😢",
  "angry": "😠",
  "disgusted": "😖",
  "surprised": "😲",
  "fearful": "😨",
};

function RealTimeEmotionDetection({ onEmotionDetected }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [currentDetections, setCurrentDetections] = useState({});
  
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const highestEmotion = Object.entries(expressions).reduce(
          (highest, current) => (current[1] > highest[1] ? current : highest),
          ["neutral", 0] // Default to "neutral" in case no emotion is detected
        );

        onEmotionDetected(highestEmotion);
        setCurrentEmotion(highestEmotion);
        setCurrentDetections(expressions);
      }

      // Draw bounding box
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 500,
        height: 500,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 500,
        height: 500,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };

  const emotionBars = Object.entries(currentDetections).map(
    ([emotion, value]) => (
      <div key={emotion} className={CameraStyles.emotionContainer}>
        <span className={CameraStyles.emotionLabel}>{emotion}</span>
        <div className={CameraStyles.emotionBarWrapper}>
          <motion.div
            className={CameraStyles.emotionBar}
            initial={{ width: 0 }}
            animate={{ width: `${value * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    )
  );

  return (
    <>
      <div className={CameraStyles.myapp}>
        <div className={CameraStyles.appvide}>
          <video ref={videoRef} autoPlay muted />
          <canvas ref={canvasRef} className={CameraStyles.appcanvas} />
        </div>
        <div className={CameraStyles.emotions}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>
              Most Probable Emotion: {currentEmotion[0]}
              {EMOTION_EMOJI_MAP[currentEmotion[0]]}
            </h3>
            <h3>Probability: {(currentEmotion[1] * 100).toFixed(2)}%</h3>
          </div>
          {emotionBars}
        </div>
      </div>
    </>
  );
}

export default RealTimeEmotionDetection;
