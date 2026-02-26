import { useState } from "react";

function HomeownerDashboard({ bookings, setBookings, workers, setWorkers, addNotification }) {
    const [feedback, setFeedback] = useState({
        workerId: "",
        rating: 5,
        comment: ""
    });
    const [showAlert, setShowAlert] = useState(false);

    const updateBookingStatus = (id, newStatus) => {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        addNotification(`Booking status updated to ${newStatus}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prev => ({ ...prev, [name]: value }));
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        const workerId = parseInt(feedback.workerId);
        const rating = parseInt(feedback.rating);

        setWorkers(workers.map(w => w.id === workerId ? {
            ...w,
            reliabilityScore: Math.min(100, Math.round((w.reliabilityScore + (rating * 20)) / 2))
        } : w));

        addNotification(`Feedback submitted! Worker reliability updated.`);
        setShowAlert(true);
        setFeedback({ workerId: "", rating: 5, comment: "" });
        setTimeout(() => setShowAlert(false), 3000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "#ffcc00";
            case "confirmed": return "#4ade80";
            case "completed": return "#638cff";
            default: return "var(--muted)";
        }
    };

    return (
        <div className="homeowner-panel" style={{ width: "100%" }}>
            <h2 className="form-title" style={{ marginBottom: "20px" }}>My Bookings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "40px" }}>
                {bookings.map(booking => (
                    <div key={booking.id} style={{
                        background: "var(--card-bg)",
                        padding: "20px",
                        borderRadius: "15px",
                        border: "1px solid var(--card-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div>
                            <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{booking.workerName} - {booking.serviceType}</h3>
                            <span style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                background: `rgba(255, 255, 255, 0.05)`,
                                color: getStatusColor(booking.status),
                                border: `1px solid ${getStatusColor(booking.status)}`
                            }}>
                                {booking.status}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {booking.status === "pending" && (
                                <button
                                    className="btn-primary"
                                    style={{ width: "auto", padding: "8px 15px", fontSize: "13px" }}
                                    onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                >
                                    Confirm Booking
                                </button>
                            )}
                            {booking.status === "confirmed" && (
                                <button
                                    className="btn-primary"
                                    style={{ width: "auto", padding: "8px 15px", fontSize: "13px", background: "linear-gradient(135deg, #638cff, #4a6fe0)" }}
                                    onClick={() => updateBookingStatus(booking.id, "completed")}
                                >
                                    Complete Service
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="form-title" style={{ marginBottom: "20px" }}>Submit Feedback</h2>

            {showAlert && (
                <div style={{
                    background: "rgba(74, 222, 128, 0.2)",
                    color: "#4ade80",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    border: "1px solid #4ade80",
                    fontSize: "14px"
                }}>
                    ✓ Feedback submitted successfully!
                </div>
            )}

            <form onSubmit={handleFeedbackSubmit} style={{ padding: "20px" }}>
                <div className="form-row">
                    <label>Select Worker</label>
                    <select name="workerId" value={feedback.workerId} onChange={handleChange} required>
                        <option value="">Choose a worker</option>
                        {workers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                </div>
                <div className="form-row">
                    <label>Rating (1-5 Stars)</label>
                    <select name="rating" value={feedback.rating} onChange={handleChange} required>
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Stars</option>)}
                    </select>
                </div>
                <div className="form-row">
                    <label>Comment</label>
                    <textarea
                        name="comment"
                        placeholder="How was the service?"
                        value={feedback.comment}
                        onChange={handleChange}
                        rows="3"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "#fff", borderRadius: "8px", padding: "10px" }}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>Submit Feedback</button>
            </form>

            <div style={{ marginTop: "40px" }}>
                <h2 className="form-title" style={{ marginBottom: "20px" }}>Verified Workers</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    {workers.filter(w => w.status === "verified").map(worker => (
                        <div key={worker.id} style={{
                            background: "var(--card-bg)",
                            padding: "20px",
                            borderRadius: "15px",
                            border: "1px solid var(--card-border)"
                        }}>
                            <h3 style={{ margin: "0 0 10px 0", fontSize: "15px" }}>{worker.name}</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                                    <div style={{
                                        width: `${worker.reliabilityScore}%`,
                                        height: "100%",
                                        background: worker.reliabilityScore > 70 ? "#4ade80" : worker.reliabilityScore > 40 ? "#ffcc00" : "#ef4444",
                                        transition: "width 0.5s ease"
                                    }} />
                                </div>
                                <span style={{ fontSize: "12px", fontWeight: "700" }}>{worker.reliabilityScore}%</span>
                            </div>
                            <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: "5px" }}>Reliability Score</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeownerDashboard;
