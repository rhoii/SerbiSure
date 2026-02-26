function AdminDashboard({ workers, setWorkers, addNotification }) {
    const verifyWorker = (id) => {
        setWorkers(workers.map(w => w.id === id ? { ...w, status: "verified" } : w));
        const worker = workers.find(w => w.id === id);
        addNotification(`Worker ${worker.name} has been verified!`);
    };

    return (
        <div className="admin-panel" style={{ width: "100%" }}>
            <h2 className="form-title" style={{ marginBottom: "20px" }}>Worker Verification</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {workers.map(worker => (
                    <div key={worker.id} style={{
                        background: "var(--card-bg)",
                        padding: "20px",
                        borderRadius: "15px",
                        border: "1px solid var(--card-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div>
                            <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{worker.name}</h3>
                            <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)" }}>
                                TESDA Certificate: {worker.tesdaCertificate ? "✅ Provided" : "❌ Missing"}
                            </p>
                            <span style={{
                                display: "inline-block",
                                marginTop: "10px",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                background: worker.status === "verified" ? "rgba(75, 222, 128, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                color: worker.status === "verified" ? "#4ade80" : "#ef4444",
                                border: `1px solid ${worker.status === "verified" ? "#4ade80" : "#ef4444"}`
                            }}>
                                {worker.status}
                            </span>
                        </div>
                        {worker.status === "unverified" && (
                            <button
                                className="btn-primary"
                                style={{ width: "auto", padding: "8px 20px" }}
                                onClick={() => verifyWorker(worker.id)}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
