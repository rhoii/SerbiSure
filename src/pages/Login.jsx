import { useState } from "react";
import { Link } from "react-router-dom";
import { BrandingHeader, RegistrationFooter } from "../components";
import { appName, systemInfo } from "../data/system";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.email, formData.password);
    };

    return (
        <main className="page-wrapper">
            <BrandingHeader title={appName} />
            <section>
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Login</h2>
                    <p className="form-subtitle">Access your SerbiSure account</p>

                    <div className="form-row">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="btn-toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary">Log In</button>

                    <p className="muted-footer" style={{ marginTop: "10px", color: "var(--text)", fontSize: "14px" }}>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            style={{ color: "var(--accent)", cursor: "pointer", fontWeight: "600", textDecoration: "none" }}
                        >
                            Register here
                        </Link>
                    </p>
                </form>
            </section>
            <RegistrationFooter
                name={systemInfo.name}
                tagline={systemInfo.tagline}
                version={systemInfo.version}
            />
        </main>
    );
}

export default Login;