import AdminDashboard from "../components/AdminDashboard";
import HomeownerDashboard from "../components/HomeownerDashboard";
import Analytics from "../components/Analytics";
import { RegistrationFooter } from "../components";
import { systemInfo } from "../data/system";

function Dashboard({ user, workers, setWorkers, bookings, setBookings, notifications, onLogout, addNotification }) {
    const [view, setView] = useState("dashboard");

    return (
        <main className="page-wrapper" style={{ maxWidth: "1000px" }}>

            <nav className="nav-tabs" style={{ display: "flex", gap: "20px", marginBottom: "30px", width: "100%", justifyContent: "center" }}>
                <button
                    className={`nav-btn ${view === "dashboard" ? "active" : ""}`}
                    onClick={() => setView("dashboard")}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        background: view === "dashboard" ? "var(--accent)" : "rgba(255,255,255,0.05)",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "all 0.3s ease"
                    }}
                >
                    {user.role === "admin" && view === "analytics" ? "Back to Dashboard" : (user.role === "admin" ? "Admin Panel" : "Bookings")}
                </button>
                {user.role === "admin" && view === "dashboard" && (
                    <button
                        className={`nav-btn ${view === "analytics" ? "active" : ""}`}
                        onClick={() => setView("analytics")}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            background: view === "analytics" ? "var(--accent)" : "rgba(255,255,255,0.05)",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "600",
                            transition: "all 0.3s ease"
                        }}
                    >
                        Switch to Analytics
                    </button>
                )}
                <button
                    onClick={onLogout}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        background: "rgba(255,0,0,0.1)",
                        color: "#ff4d4d",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    Logout
                </button>
            </nav>

            <div className="dashboard-content" style={{ width: "100%" }}>
                {view === "dashboard" ? (
                    user.role === "admin" ? (
                        <AdminDashboard workers={workers} setWorkers={setWorkers} addNotification={addNotification} />
                    ) : (
                        <HomeownerDashboard bookings={bookings} setBookings={setBookings} workers={workers} setWorkers={setWorkers} addNotification={addNotification} />
                    )
                ) : (
                    <Analytics workers={workers} bookings={bookings} />
                )}
            </div>

            <RegistrationFooter
                name={systemInfo.name}
                tagline={systemInfo.tagline}
                version={systemInfo.version}
            />
        </main>
    );
}

export default Dashboard;
