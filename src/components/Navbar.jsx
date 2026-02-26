import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar({ user, notifications, onLogout }) {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogoutClick = () => {
        onLogout();
        navigate("/login");
    };


    return (
        <aside className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
            <div className="sidebar-brand">
                <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
                    SerbiSure
                </Link>
            </div>

            <div className="sidebar-links" style={{ flexGrow: 1 }}>
                {/* Notifications */}
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="nav-link-item"
                    style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        justifyContent: "space-between"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        Notifications
                    </div>
                    {notifications.length > 0 && (
                        <span style={{ background: "#ff4d4d", borderRadius: "50%", padding: "2px 8px", fontSize: "11px", color: "#fff" }}>
                            {notifications.length}
                        </span>
                    )}
                </button>

                {showNotifications && (
                    <div style={{
                        position: "absolute",
                        right: "270px",
                        top: "100px",
                        width: "280px",
                        background: "#1a1a2e",
                        border: "1px solid var(--card-border)",
                        borderRadius: "16px",
                        padding: "15px",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                        zIndex: 1100,
                        backdropFilter: "blur(20px)"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <h4 style={{ margin: 0, fontSize: "13px", color: "#fff" }}>Recent Activity</h4>
                            <button className="btn-close" onClick={() => setShowNotifications(false)}>×</button>
                        </div>
                        <div style={{ maxHeight: "250px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                            {notifications.length > 0 ? (
                                notifications.slice().reverse().map(n => (
                                    <div key={n.id} style={{ fontSize: "12px", padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", color: "#a0a0c0" }}>
                                        {n.message}
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontSize: "12px", color: "var(--muted)", textAlign: "center" }}>No new notifications</p>
                            )}
                        </div>
                    </div>
                )}

                {user.role === "admin" ? (
                    <>
                        <NavLink to="/admin" className="nav-link-item" end>Admin Panel</NavLink>
                        <NavLink to="/admin/analytics" className="nav-link-item">Analytics</NavLink>
                    </>
                ) : user.role === "homeowner" ? (
                    <>
                        <NavLink to="/dashboard" className="nav-link-item">Bookings</NavLink>
                        <NavLink to="/feedback" className="nav-link-item">Feedback</NavLink>
                    </>
                ) : null}

                <NavLink to="/settings" className="nav-link-item">Settings</NavLink>
                <NavLink to="/profile" className="nav-link-item">Profile</NavLink>
            </div>

            <div className="sidebar-footer" style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px" }}>
                <button
                    onClick={handleLogoutClick}
                    className="nav-link-item"
                    style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        color: "#ff4d4d",
                        cursor: "pointer"
                    }}
                >
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

export default Navbar;
