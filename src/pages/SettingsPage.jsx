function SettingsPage() {
    return (
        <div className="page-wrapper" style={{ maxWidth: "600px" }}>
            <div className="glass-card">
                <h2 className="form-title">Settings</h2>
                <p className="form-subtitle">Configure your application preferences</p>

                <div style={{ marginTop: "30px", opacity: 0.6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid var(--card-border)" }}>
                        <span>Email Notifications</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid var(--card-border)" }}>
                        <span>Dark Mode</span>
                        <input type="checkbox" defaultChecked disabled />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid var(--card-border)" }}>
                        <span>Language</span>
                        <span>English</span>
                    </div>
                </div>
                <p style={{ marginTop: "20px", fontSize: "12px", color: "var(--muted)", textAlign: "center" }}>
                    Note: Some settings are currently locked in this demo version.
                </p>
            </div>
        </div>
    );
}

export default SettingsPage;
