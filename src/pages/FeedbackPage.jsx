import { useState } from "react";

function FeedbackPage({ workers, setWorkers, addNotification }) {
    const [feedback, setFeedback] = useState({
        workerId: "",
        rating: 5,
        comment: ""
    });
    const [showAlert, setShowAlert] = useState(false);

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

    return (
        <div className="page-wrapper" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="form-title" style={{ marginBottom: "20px" }}>Submit Feedback</h2>

            {showAlert && (
                <div style={{
                    background: "rgba(74, 222, 128, 0.2)",
                    color: "#4ade80",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    border: "1px solid #4ade80",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <span>✓ Feedback submitted successfully!</span>
                    <button className="btn-close" style={{ color: "#4ade80" }} onClick={() => setShowAlert(false)}>×</button>
                </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="glass-card" style={{ padding: "30px", borderRadius: "15px", background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
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
                        rows="4"
                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "#fff", borderRadius: "8px", padding: "12px" }}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>Submit Feedback</button>
            </form>
        </div>
    );
}

export default FeedbackPage;
