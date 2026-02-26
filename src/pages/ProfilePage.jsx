import { useState } from "react";

function ProfilePage({ user, onUpdateProfile }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: "" // password field is blank for editing
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile({ ...user, name: formData.name, email: formData.email });
        setIsEditing(false);
    };

    return (
        <div className="page-wrapper" style={{ maxWidth: "600px" }}>
            <div className="glass-card">
                <h2 className="form-title">My Profile</h2>
                <p className="form-subtitle">Manage your personal information</p>

                <div style={{ marginTop: "30px" }}>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} style={{ padding: 0, background: "none", border: "none", backdropFilter: "none", boxShadow: "none" }}>
                            <div className="form-row">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row" style={{ marginTop: "10px" }}>
                                <button type="submit" className="btn-primary">Save Changes</button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="btn-primary"
                                    style={{ background: "rgba(255,255,255,0.05)", color: "#fff", marginTop: "10px" }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div className="profile-field">
                                <label>Full Name</label>
                                <p style={{ fontSize: "18px", fontWeight: "600", margin: "5px 0" }}>{user.name}</p>
                            </div>
                            <div className="profile-field">
                                <label>Email Address</label>
                                <p style={{ fontSize: "18px", fontWeight: "600", margin: "5px 0" }}>{user.email}</p>
                            </div>
                            <div className="profile-field">
                                <label>Account Role</label>
                                <p style={{ fontSize: "14px", fontWeight: "700", margin: "5px 0", color: "var(--accent)", textTransform: "uppercase" }}>{user.role}</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-primary"
                                style={{ marginTop: "20px" }}
                            >
                                Edit Profile info
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
