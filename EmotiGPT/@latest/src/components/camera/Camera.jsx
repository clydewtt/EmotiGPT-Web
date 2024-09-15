import { useRef, useEffect, useState } from "react";
import CameraStyles from "./Camera.module.css";
import * as faceapi from "face-api.js";
import { EmotionType } from "../../constants/EmotionTypes";
import { motion } from "framer-motion";

const EMOTION_TYPES = Object.values(EmotionType);

function RealTimeEmotionDetection() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [currentDetections, setCurrentDetections] = useState({});
  // LOAD FROM USEEFFECT
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  // OPEN YOU FACE WEBCAM
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
  // LOAD MODELS FROM FACE API

  const loadModels = () => {
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
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
        console.log(expressions);
        setCurrentEmotion(highestEmotion);
        setCurrentDetections(expressions);
      }

      // const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      // canvasRef.current.innerHTML = ""; // Clear existing canvas
      // canvasRef.current.append(canvas);

      // faceapi.matchDimensions(canvas, {
      //   width: videoRef.current.width,
      //   height: videoRef.current.height,
      // });

      // const resized = faceapi.resizeResults(detections, {
      //   width: videoRef.current.width,
      //   height: videoRef.current.height,
      // });

      // DRAW YOU FACE IN WEBCAM
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
        <span>{emotion}</span>
        <motion.div
          className={CameraStyles.emotionBar}
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.2 }} // Smooth animation
          style={{ backgroundColor: "#293151" }} // Customize bar color here
        />
      </div>
    )
  );

  return (
    <div className={CameraStyles.myapp}>
      <div>Most Probable Emotion: {currentEmotion[0]}</div>
      <div className={CameraStyles.appvide}>
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      {/* <div>Possible Emotion Detections: {EMOTION_TYPES}</div> */}
      <div className={CameraStyles.emotions}>{emotionBars}</div>
      <canvas ref={canvasRef} className={CameraStyles.appcanvas} />
    </div>
  );
}

export default RealTimeEmotionDetection;
