import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage.jsx";
import SignUpPage from "./pages/SignUp/SignUpPage.jsx";
import Home from "./pages/home/Home.jsx";

//Testing out sentiment analysis
//import ChatBox from "./AnalysisTest.jsx";
//<Route path="/sentiment-analysis-test-page" element={<ChatBox />} />

export const RoutesToPages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />

        {/* Redirect "/" path to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default RoutesToPages;
