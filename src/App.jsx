import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AnalyticsPage from "./pages/AnalyticsPage";
import BookingsPage from "./pages/BookingsPage";
import FeedbackPage from "./pages/FeedbackPage";
import AdminPage from "./pages/AdminPage";

import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function AppContent() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({ name: "", email: "", role: "" });
    const [notifications, setNotifications] = useState([]);

    // Mock initial workers
    const [workers, setWorkers] = useState([
        { id: 1, name: "Juana Dela Cruz", tesdaCertificate: true, status: "unverified", reliabilityScore: 85 },
        { id: 2, name: "Mario Rossi", tesdaCertificate: false, status: "unverified", reliabilityScore: 40 },
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

    return (
        <div className="app-container" style={{
            flexDirection: "row",
            height: "100vh",
            overflow: "hidden",
            padding: 0
        }}>
            {isAuthenticated && <Navbar user={user} notifications={notifications} onLogout={handleLogout} />}
            <div className="page-content" style={{
                flex: "1",
                height: "100vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: isAuthenticated ? "40px" : "0",
                paddingRight: isAuthenticated ? "300px" : "0",
                transition: "padding-right 0.3s ease",
                background: "#08080f",
                position: "relative"
            }}>
                {isAuthenticated && (
                    <div style={{
                        position: "absolute",
                        top: "30px",
                        left: "30px",
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#fff",
                        zIndex: 10
                    }}>
                        Hi {user.name}!
                    </div>
                )}
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
                                <BookingsPage bookings={bookings} setBookings={setBookings} workers={workers} addNotification={addNotification} />) :
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
                            <SettingsPage /> :
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
