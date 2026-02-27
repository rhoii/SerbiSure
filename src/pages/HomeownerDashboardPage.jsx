import { useState } from "react";
import { activeRequests, topRatedWorkers, dashboardNotifications } from "../data/dashboard";
import "../styles/Dashboard.css";
import "../styles/ActiveRequests.css";
import "../styles/Sidebar.css";

function HomeownerDashboardPage({ user }) {
    const [activeTab, setActiveTab] = useState("pending");

    const filteredRequests = activeTab === "pending"
        ? activeRequests.filter(r => r.status !== "confirmed")
        : activeRequests.filter(r => r.status === "confirmed");

    return (
        <div className="dashboard-page">
            {/* Main Content */}
            <div className="dashboard-main">
                {/* Welcome */}
                <div className="dashboard-welcome">
                    <div className="dashboard-welcome-header">
                        <div>
                            <h1>Welcome back, {user.name || "Alex"}</h1>
                            <p>Manage your household services and trusted workers.</p>
                        </div>
                        <div className="system-status-badge">
                            <span className="status-dot"></span>
                            System Online
                        </div>
                    </div>
                </div>

                {/* Controls: Tabs + Filter */}
                <div className="dashboard-controls">
                    <div className="dashboard-tabs">
                        <button
                            className={`dashboard-tab ${activeTab === "pending" ? "active" : ""}`}
                            onClick={() => setActiveTab("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`dashboard-tab ${activeTab === "confirmed" ? "active" : ""}`}
                            onClick={() => setActiveTab("confirmed")}
                        >
                            Confirmed
                        </button>
                    </div>

                    <div className="dashboard-filter">
                        <span className="filter-label">Reliability Score</span>
                        <button className="filter-dropdown">
                            4.5+ Stars
                            <span className="filter-star">★</span>
                            <span className="filter-chevron">▾</span>
                        </button>
                    </div>
                </div>

                {/* Active Requests */}
                <div className="active-requests-header">
                    <h2>Active Requests</h2>
                    <span className="request-count-badge">{filteredRequests.length}</span>
                </div>

                <div className="request-list">
                    {filteredRequests.map(request => (
                        <div className="request-card" key={request.id}>
                            {/* Top: Image + Info + Status */}
                            <div className="request-card-top">
                                <div className="request-card-image">
                                    <img src={request.image} alt={request.title} />
                                </div>
                                <div className="request-card-info">
                                    <h3>{request.title}</h3>
                                    <div className="request-card-category">
                                        {request.category} • {request.priority}
                                    </div>
                                    <div className="request-card-meta">
                                        <span className="request-meta-item">
                                            <span className="request-meta-icon">📅</span>
                                            {request.date}
                                        </span>
                                        <span className="request-meta-item">
                                            <span className="request-meta-icon">$</span>
                                            Est. {request.estimatedCost}
                                        </span>
                                    </div>
                                </div>
                                <span className={`request-status ${request.status}`}>
                                    {request.statusLabel}
                                </span>
                            </div>

                            {/* Bottom: Worker or Searching State */}
                            {request.worker && (
                                <div className="request-card-bottom">
                                    <div className="request-worker">
                                        <div className="request-worker-avatar">
                                            {request.worker.avatar}
                                        </div>
                                        <div className="request-worker-info">
                                            <span className="request-worker-name">
                                                {request.worker.name}
                                            </span>
                                            <span className="request-worker-rating">
                                                ★ {request.worker.rating}
                                                <span className="review-count">
                                                    ({request.worker.reviews} reviews)
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="request-card-actions">
                                        <button className="btn-details">Details</button>
                                        <button className="btn-message">Message</button>
                                    </div>
                                </div>
                            )}

                            {request.searching && (
                                <div className="request-searching">
                                    <span className="searching-dot"></span>
                                    <span className="searching-text">{request.searchingText}</span>
                                    <button className="cancel-link">Cancel</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            <div className="dashboard-sidebar">
                {/* CTA Card */}
                <div className="sidebar-cta">
                    <h3>Need a new service?</h3>
                    <p>Find reliable workers for your next project instantly.</p>
                    <button className="btn-book-now">Book Now</button>
                </div>

                {/* Top Rated Nearby */}
                <div className="sidebar-panel">
                    <div className="sidebar-panel-header">
                        <h3>Top Rated Nearby</h3>
                        <button className="view-all">View All</button>
                    </div>
                    <div className="top-rated-list">
                        {topRatedWorkers.map(worker => (
                            <div className="top-rated-item" key={worker.id}>
                                <div className="top-rated-avatar">
                                    <span style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "20px",
                                        background: "#2a2a44",
                                        borderRadius: "50%",
                                    }}>
                                        {worker.avatar}
                                    </span>
                                    {worker.verified && (
                                        <span className="verified-badge">✓</span>
                                    )}
                                </div>
                                <div className="top-rated-info">
                                    <div className="top-rated-name">{worker.name}</div>
                                    <div className="top-rated-specialty">{worker.specialty}</div>
                                </div>
                                <div className="top-rated-score">
                                    <div className="top-rated-rating">
                                        {worker.rating}
                                        <span className="star">★</span>
                                    </div>
                                    <div className={`top-rated-reliability ${worker.belowThreshold ? "top-rated-below-threshold" : ""}`}>
                                        {worker.reliability}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications */}
                <div className="sidebar-panel">
                    <div className="sidebar-panel-header">
                        <h3>Notifications</h3>
                    </div>
                    <div className="notification-list">
                        {dashboardNotifications.map(notif => (
                            <div className="notification-item" key={notif.id}>
                                <span className={`notification-dot ${notif.unread ? "unread" : "read"}`}></span>
                                <div className="notification-content">
                                    <h4>{notif.title}</h4>
                                    <p>{notif.message}</p>
                                    <span className="notification-time">{notif.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeownerDashboardPage;
