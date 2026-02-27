import { useState } from "react";

function ServicesPage({ workers, addNotification }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [bookingWorker, setBookingWorker] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        serviceType: "",
        date: "",
        time: "",
        description: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const categories = ["All", "Plumbing", "Electrical", "Cleaning", "Carpentry", "General"];

    const filteredWorkers = workers.filter(worker => {
        const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (worker.skills && worker.skills.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "All" ||
            (worker.skills && worker.skills.toLowerCase().includes(selectedCategory.toLowerCase()));
        return matchesSearch && matchesCategory;
    });

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        addNotification(`Booking request sent to ${bookingWorker.name} for ${bookingDetails.serviceType}!`);
        setShowSuccess(true);
        setBookingWorker(null);
        setBookingDetails({ serviceType: "", date: "", time: "", description: "" });
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="page-wrapper" style={{ width: "100%", maxWidth: "1100px" }}>
            {/* Header */}
            <div style={{ marginBottom: "28px", width: "100%" }}>
                <h2 style={{ fontSize: "26px", fontWeight: "700", color: "#fff", margin: "0 0 6px 0" }}>
                    Browse Services
                </h2>
                <p style={{ fontSize: "14px", color: "#8b8ba3", margin: 0 }}>
                    Find and book verified service providers for your home
                </p>
            </div>

            {/* Success alert */}
            {showSuccess && (
                <div style={{
                    background: "rgba(46, 213, 115, 0.12)",
                    color: "#2ed573",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    border: "1px solid rgba(46, 213, 115, 0.25)",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <span>✓ Booking request sent successfully!</span>
                    <button style={{ background: "none", border: "none", color: "#2ed573", cursor: "pointer", fontSize: "18px" }}
                        onClick={() => setShowSuccess(false)}>×</button>
                </div>
            )}

            {/* Search + Category Filter */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", width: "100%", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Search by name or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        flex: 1,
                        minWidth: "200px",
                        padding: "12px 18px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#fff",
                        fontSize: "14px",
                        outline: "none"
                    }}
                />
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: "none",
                                background: selectedCategory === cat ? "#6c5ce7" : "rgba(255,255,255,0.05)",
                                color: selectedCategory === cat ? "#fff" : "#8b8ba3",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Worker Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px", width: "100%" }}>
                {filteredWorkers.map(worker => (
                    <div key={worker.id} style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "16px",
                        padding: "22px",
                        transition: "border-color 0.2s ease"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                            <div style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "50%",
                                background: "#2a2a44",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px"
                            }}>
                                👤
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: "0 0 3px 0", fontSize: "16px", color: "#fff" }}>{worker.name}</h3>
                                <span style={{
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    color: worker.status === "verified" ? "#2ed573" : "#ffa502",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                }}>
                                    {worker.status === "verified" ? "✓ Verified" : "⏳ Pending"}
                                </span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "18px", fontWeight: "700", color: "#f39c12" }}>
                                    {worker.reliabilityScore}%
                                </div>
                                <div style={{ fontSize: "10px", color: "#6b6b8a" }}>Reliability</div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                            {(worker.skills || "General Labor").split(",").map((skill, i) => (
                                <span key={i} style={{
                                    padding: "4px 10px",
                                    background: "rgba(108, 92, 231, 0.1)",
                                    border: "1px solid rgba(108, 92, 231, 0.2)",
                                    borderRadius: "12px",
                                    fontSize: "11px",
                                    color: "#a29bfe",
                                    fontWeight: "500"
                                }}>
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>

                        {/* TESDA Badge */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "16px",
                            fontSize: "12px",
                            color: worker.tesdaCertificate ? "#2ed573" : "#6b6b8a"
                        }}>
                            {worker.tesdaCertificate ? "🏅 TESDA Certified" : "No TESDA Certificate"}
                        </div>

                        <button
                            onClick={() => setBookingWorker(worker)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "10px",
                                border: "none",
                                background: "linear-gradient(135deg, #6c5ce7, #4834d4)",
                                color: "#fff",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                boxShadow: "0 2px 8px rgba(108, 92, 231, 0.3)",
                                transition: "transform 0.15s ease"
                            }}
                        >
                            Book Service
                        </button>
                    </div>
                ))}
            </div>

            {filteredWorkers.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px", color: "#6b6b8a" }}>
                    <p style={{ fontSize: "16px" }}>No workers found matching your search.</p>
                </div>
            )}

            {/* Booking Modal */}
            {bookingWorker && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2000,
                    backdropFilter: "blur(4px)"
                }}>
                    <div style={{
                        background: "#1a1a2e",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "20px",
                        padding: "32px",
                        width: "100%",
                        maxWidth: "460px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                            <h3 style={{ margin: 0, fontSize: "20px", color: "#fff" }}>
                                Book {bookingWorker.name}
                            </h3>
                            <button onClick={() => setBookingWorker(null)} style={{
                                background: "none",
                                border: "none",
                                color: "#8b8ba3",
                                fontSize: "22px",
                                cursor: "pointer"
                            }}>×</button>
                        </div>

                        <form onSubmit={handleBookingSubmit} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            padding: 0,
                            background: "none",
                            border: "none",
                            boxShadow: "none",
                            backdropFilter: "none"
                        }}>
                            <div className="form-row">
                                <label>Service Type</label>
                                <select name="serviceType" value={bookingDetails.serviceType} onChange={handleBookingChange} required>
                                    <option value="">Select a service</option>
                                    {(bookingWorker.skills || "General").split(",").map((s, i) => (
                                        <option key={i} value={s.trim()}>{s.trim()}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Preferred Date</label>
                                <input type="date" name="date" value={bookingDetails.date} onChange={handleBookingChange} required />
                            </div>
                            <div className="form-row">
                                <label>Preferred Time</label>
                                <input type="time" name="time" value={bookingDetails.time} onChange={handleBookingChange} required />
                            </div>
                            <div className="form-row">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Describe the issue or work needed..."
                                    value={bookingDetails.description}
                                    onChange={handleBookingChange}
                                    rows="3"
                                    style={{
                                        width: "100%",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#fff",
                                        borderRadius: "10px",
                                        padding: "12px",
                                        fontFamily: "inherit",
                                        fontSize: "14px",
                                        resize: "vertical"
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                                <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                                    Confirm Booking
                                </button>
                                <button type="button" onClick={() => setBookingWorker(null)} style={{
                                    flex: 1,
                                    padding: "12px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: "transparent",
                                    color: "#fff",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    fontFamily: "inherit"
                                }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServicesPage;
