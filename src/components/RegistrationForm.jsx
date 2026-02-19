import { useState } from "react";

function RegistrationForm({ title, subtitle, roles, skills }) {
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleTogglePassword() {
        setShowPassword(!showPassword);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <section>
                <div className="success-card">
                    <span className="success-icon">✓</span>
                    <h2 className="form-title">Registration Successful!</h2>
                    <p className="form-subtitle">
                        Your account has been created. You will be verified shortly.
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
                    <label>Email</label>
                    <input type="email" placeholder="Email" required />
                </div>

                <div className="form-row">
                    <label>Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            className="btn-toggle-password"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div className="form-row">
                    <label>User Type:</label>
                    <select>
                        {roles.map((role, index) => (
                            <option key={index}>{role}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <label>Skill Category:</label>
                    <select>
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

                <button type="submit" className="btn-primary">Register</button>
            </form>
        </section>
    );
}

export default RegistrationForm;
