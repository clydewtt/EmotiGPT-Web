import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage.jsx";
import SignUpPage from "./pages/SignUp/SignUpPage.jsx";

//Testing out sentiment analysis
//import ChatBox from "./AnalysisTest.jsx";
//<Route path="/sentiment-analysis-test-page" element={<ChatBox />} />

export const RoutesToPages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default RoutesToPages;
