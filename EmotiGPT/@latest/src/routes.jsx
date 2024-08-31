
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Login_Signin_Pages/LoginPage"
import SignUpPage from "./Login_Signin_Pages/SignUpPage"

export const routes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login-page" element={<LoginPage />} />
                <Route path="/create-account-page" element={<SignUpPage />} />
            </Routes>
        </Router>
    );
};

export default routes;
