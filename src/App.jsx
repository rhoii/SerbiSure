import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import MainFeed from "./pages/MainFeed";
import AnalyticsPage from "./pages/AnalyticsPage";
import FeedbackPage from "./pages/FeedbackPage";
import AdminPage from "./pages/AdminPage";

import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function AppContent() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({ name: "", email: "", role: "", about: "", skills: "", location: "" });
    const [notifications, setNotifications] = useState([]);
    const [settings, setSettings] = useState({
        darkMode: true,
        language: "English"
    });

    // Mock initial workers
    const [workers, setWorkers] = useState([
        { id: 1, name: "Juana Dela Cruz", tesdaCertificate: true, status: "verified", reliabilityScore: 92, skills: "Plumbing, Pipes, Drainage" },
        { id: 2, name: "Mario Rossi", tesdaCertificate: false, status: "verified", reliabilityScore: 85, skills: "Electrical, Wiring, Lighting" },
        { id: 3, name: "Maria Clara", tesdaCertificate: true, status: "unverified", reliabilityScore: 60, skills: "House Cleaning, Janitorial" },
    ]);

    // Mock initial bookings
    const [bookings, setBookings] = useState([
        { id: 1, workerName: "Juana Dela Cruz", serviceType: "Plumbing", status: "pending" },
    ]);

    const addNotification = (message) => {
        setNotifications((prev) => [...prev, { id: Date.now(), message }]);
    };

    const handleLogin = (email, password) => {
        let role = "homeowner";
        let name = email.split('@')[0];
        if (email === "admin@serbisure.com") {
            role = "admin";
            name = "System Admin";
        }

        setIsAuthenticated(true);
        setUser({ name, email, role });
        addNotification(`Welcome back, ${name}!`);
        navigate(role === "admin" ? "/admin" : "/dashboard");
    };

    const handleRegister = (email, role, name) => {
        setIsAuthenticated(true);
        setUser({ name, email, role: role === "Service Worker" ? "worker" : "homeowner" });
        addNotification(`Welcome to SerbiSure, ${name}!`);
        navigate("/dashboard");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser({ name: "", email: "", role: "" });
        navigate("/login");
    };

    const handleUpdateProfile = (updatedUser) => {
        setUser(updatedUser);
        addNotification("Profile updated successfully!");
    };

    const handleUpdateSettings = (newSettings) => {
        setSettings(newSettings);
        addNotification("Settings updated!");
    };

    return (
        <div className={`app-container ${!settings.darkMode ? "light-theme" : ""}`}>
            {isAuthenticated && <Navbar user={user} notifications={notifications} onLogout={handleLogout} />}
            <div className="page-content">
                {isAuthenticated && (
                    <div style={{
                        width: "100%",
                        maxWidth: "1200px",
                        padding: "0 20px",
                        marginTop: "20px",
                        marginBottom: "10px",
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#fff",
                    }}>
                        Hi {user.name}!
                    </div>
                )}
                <div style={{ height: "10px" }}></div>
                <Routes>
                    <Route path="/login" element={
                        !isAuthenticated ?
                            <Login onLogin={handleLogin} /> :
                            <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />
                    } />
                    <Route path="/register" element={
                        !isAuthenticated ?
                            <Registration onRegister={handleRegister} /> :
                            <Navigate to="/dashboard" />
                    } />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                        isAuthenticated ?
                            (user.role === "admin" ? <Navigate to="/admin" /> :
                                <MainFeed workers={workers} addNotification={addNotification} />) :
                            <Navigate to="/login" />
                    } />

                    <Route path="/admin" element={
                        isAuthenticated && user.role === "admin" ?
                            <AdminPage workers={workers} setWorkers={setWorkers} addNotification={addNotification} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/admin/analytics" element={
                        isAuthenticated && user.role === "admin" ?
                            <AnalyticsPage workers={workers} bookings={bookings} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/feedback" element={
                        isAuthenticated && user.role === "homeowner" ?
                            <FeedbackPage workers={workers} setWorkers={setWorkers} addNotification={addNotification} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/profile" element={
                        isAuthenticated ?
                            <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/settings" element={
                        isAuthenticated ?
                            <SettingsPage settings={settings} onUpdateSettings={handleUpdateSettings} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/" element={<Navigate to={isAuthenticated ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login"} />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
