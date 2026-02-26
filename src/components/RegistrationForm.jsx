import { useState } from "react";
import { Link } from "react-router-dom";

function RegistrationForm({ title, subtitle, roles, skills, onRegister }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: roles[0]
    });
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(formData.email, formData.role, formData.name);
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <section>
                <div className="success-card">
                    <span className="success-icon">✓</span>
                    <h2 className="form-title">Registration Successful!</h2>
                    <p className="form-subtitle">
                        Welcome, {formData.name}! Your account has been created.
                    </p>
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={() => setSubmitted(false)}
                    >
                        Back to Registration
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">{title}</h2>
                <p className="form-subtitle">{subtitle}</p>

                <div className="form-row">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

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

                <div className="form-row">
                    <label>User Type:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                {formData.role === "Service Worker" && (
                    <>
                        <div className="form-row">
                            <label>Skill Category:</label>
                            <select name="skill" onChange={handleChange}>
                                {skills.map((skill, index) => (
                                    <option key={index} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Upload ID &amp; TESDA Certificate</label>
                            <div className="file-input">
                                <input type="file" />
                            </div>
                        </div>
                    </>
                )}

                <button type="submit" className="btn-primary">Register</button>

                <p className="muted-footer" style={{ marginTop: "10px", color: "var(--text)", fontSize: "14px" }}>
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{ color: "var(--accent)", cursor: "pointer", fontWeight: "600", textDecoration: "none" }}
                    >
                        Log in here
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default RegistrationForm;
