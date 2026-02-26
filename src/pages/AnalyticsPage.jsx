function AnalyticsPage({ workers, bookings }) {
    const totalBookings = bookings.length;
    const verifiedWorkers = workers.filter(w => w.status === "verified").length;
    const avgReliability = workers.length > 0
        ? Math.round(workers.reduce((acc, w) => acc + w.reliabilityScore, 0) / workers.length)
        : 0;

    return (
        <div className="page-wrapper">
            <h2 className="form-title" style={{ marginBottom: "20px" }}>System Analytics</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                <div className="glass-card" style={{
                    background: "var(--card-bg)",
                    padding: "30px",
                    borderRadius: "15px",
                    border: "1px solid var(--card-border)",
                    textAlign: "center"
                }}>
                    <h3 style={{ fontSize: "42px", margin: "0 0 10px 0", color: "var(--accent)" }}>{totalBookings}</h3>
                    <p style={{ margin: 0, color: "var(--muted)", textTransform: "uppercase", fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>Total Bookings</p>
                </div>
                <div className="glass-card" style={{
                    background: "var(--card-bg)",
                    padding: "30px",
                    borderRadius: "15px",
                    border: "1px solid var(--card-border)",
                    textAlign: "center"
                }}>
                    <h3 style={{ fontSize: "42px", margin: "0 0 10px 0", color: "#4ade80" }}>{verifiedWorkers}</h3>
                    <p style={{ margin: 0, color: "var(--muted)", textTransform: "uppercase", fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>Verified Workers</p>
                </div>
                <div className="glass-card" style={{
                    background: "var(--card-bg)",
                    padding: "30px",
                    borderRadius: "15px",
                    border: "1px solid var(--card-border)",
                    textAlign: "center"
                }}>
                    <h3 style={{ fontSize: "42px", margin: "0 0 10px 0", color: "#ffcc00" }}>{avgReliability}%</h3>
                    <p style={{ margin: 0, color: "var(--muted)", textTransform: "uppercase", fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>Avg Reliability</p>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;
