import { useState } from "react";

function MainFeed({ workers, addNotification }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredWorkers = workers.filter(worker =>
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (worker.skills && worker.skills.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleBookNow = (workerName) => {
        addNotification(`Booking request sent to ${workerName}!`);
    };

    return (
        <div className="page-wrapper" style={{ width: "100%", maxWidth: "1200px" }}>
            <div style={{ marginBottom: "30px", width: "100%" }}>
                <h2 className="form-title">Service Provider Feed</h2>
                <p className="form-subtitle">Discover and connect with skilled professionals near you</p>

                <div style={{ marginTop: "30px", marginBottom: "20px", position: "relative" }}>
                    <input
                        type="text"
                        placeholder="Search skills (e.g. Plumbing, Electrical)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: "100%", padding: "15px 20px", borderRadius: "30px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "#fff" }}
                    />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "25px", width: "100%" }}>
                {filteredWorkers.map(worker => (
                    <div key={worker.id} className="glass-card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                                <div style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "15px",
                                    background: "var(--bg-2)",
                                    border: "1px solid var(--card-border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "35px"
                                }}>
                                    👤
                                </div>
                                <div style={{ paddingBottom: "5px" }}>
                                    <h3 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>{worker.name}</h3>
                                    <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "600" }}>
                                        {worker.status === "verified" ? "✓ Verified Pro" : "Pending Verification"}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)" }}>Top Skills</label>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "5px" }}>
                                    {(worker.skills || "General Labor, Maintenance").split(",").map((skill, i) => (
                                        <span key={i} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", fontSize: "11px", color: "#fff" }}>
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
                                    <span color="var(--muted)">Reliability Score</span>
                                    <span style={{ fontWeight: "700", color: worker.reliabilityScore > 70 ? "#4ade80" : "#ffcc00" }}>{worker.reliabilityScore}%</span>
                                </div>
                                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                                    <div style={{
                                        width: `${worker.reliabilityScore}%`,
                                        height: "100%",
                                        background: worker.reliabilityScore > 70 ? "#4ade80" : "#ffcc00",
                                        boxShadow: "0 0 10px rgba(74, 222, 128, 0.3)"
                                    }} />
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    className="btn-primary"
                                    style={{ flex: 2, padding: "10px" }}
                                    onClick={() => handleBookNow(worker.name)}
                                >
                                    Book Service
                                </button>
                                <button className="btn-primary" style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,0.05)", color: "#fff" }}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainFeed;
