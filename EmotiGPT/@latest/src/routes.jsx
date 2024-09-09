import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Login_Signin_Pages/LoginPage";
import SignUpPage from "./Login_Signin_Pages/SignUpPage";
import ChatBox from "/Users/abdulkanu/ToDolist React/EmotiGPT-Web/EmotiGPT/@latest/src/AnalysisTest.jsx";

export const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<SignUpPage />} />
        <Route path="/sentiment-analysis-test-page" element={<ChatBox />} />
      </Routes>
    </Router>
  );
};

export default routes;
