import { useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser, onAuthChange } from "./firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HomeownerDashboardPage from "./pages/HomeownerDashboardPage";
import WorkerDashboardPage from "./pages/WorkerDashboardPage";
import ServicesPage from "./pages/FeedbackPage";

import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function AppContent() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({ name: "", email: "", role: "", about: "", skills: "", location: "" });
    const [notifications, setNotifications] = useState([]);
    const [authLoading, setAuthLoading] = useState(true);
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

    // Firebase Auth state observer — listens for session changes over HTTPS/TLS
    useEffect(() => {
        const unsubscribe = onAuthChange((firebaseUser) => {
            if (firebaseUser) {
                // User is signed in — Firebase provides a verified JWT token
                setIsAuthenticated(true);
                setUser(prev => ({
                    ...prev,
                    name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                    email: firebaseUser.email,
                    role: prev.role || "homeowner"
                }));
            } else {
                // User is signed out
                setIsAuthenticated(false);
                setUser({ name: "", email: "", role: "", about: "", skills: "", location: "" });
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const addNotification = (message) => {
        setNotifications((prev) => [...prev, { id: Date.now(), message }]);
    };

    // Firebase Auth: Email/Password sign-in (encrypted via HTTPS/TLS)
    const handleLogin = async (email, password) => {
        try {
            await loginUser(email, password);
            addNotification(`Welcome back!`);
            navigate("/dashboard");
            return { success: true };
        } catch (error) {
            return { success: false, error: error.code };
        }
    };

    // Firebase Auth: Create account with email/password (encrypted via HTTPS/TLS)
    const handleRegister = async (email, role, name, password) => {
        try {
            await registerUser(email, password, name);
            setUser(prev => ({ ...prev, role: role === "Service Worker" ? "worker" : "homeowner" }));
            addNotification(`Welcome to SerbiSure, ${name}!`);
            navigate("/dashboard");
            return { success: true };
        } catch (error) {
            return { success: false, error: error.code };
        }
    };

    // Firebase Auth: Sign out (invalidates session token)
    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
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
                <Routes>
                    <Route path="/login" element={
                        !isAuthenticated ?
                            <Login onLogin={handleLogin} /> :
                            <Navigate to="/dashboard" />
                    } />
                    <Route path="/register" element={
                        !isAuthenticated ?
                            <Registration onRegister={handleRegister} /> :
                            <Navigate to="/dashboard" />
                    } />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                        isAuthenticated ? (
                            user.role === "worker" ?
                                <WorkerDashboardPage user={user} /> :
                                <HomeownerDashboardPage user={user} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />

                    <Route path="/feedback" element={
                        isAuthenticated && user.role === "homeowner" ?
                            <ServicesPage workers={workers} addNotification={addNotification} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/profile" element={
                        isAuthenticated ?
                            <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/history" element={
                        isAuthenticated ?
                            <HistoryPage user={user} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/settings" element={
                        isAuthenticated ?
                            <SettingsPage settings={settings} onUpdateSettings={handleUpdateSettings} /> :
                            <Navigate to="/login" />
                    } />

                    <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
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
