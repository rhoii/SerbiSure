import { skillCategories } from "../data/skills";
import { systemInfo, userRoles } from "../data/system";

function RegistrationForm() {
    return (
        <section>
            <form>
                <h2 className="form-title">Registration</h2>
                <p className="form-subtitle">Join {systemInfo.totalWorkers}+ verified workers in {systemInfo.region}</p>

                <div className="form-row">
                    <label>Email</label>
                    <input type="email" placeholder="Email" required />
                </div>

                <div className="form-row">
                    <label>Password</label>
                    <input type="password" placeholder="Password" required />
                </div>

                <div className="form-row">
                    <label>User Type:</label>
                    <select>
                        {userRoles.map((role, index) => (
                            <option key={index}>{role}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <label>Skill Category:</label>
                    <select>
                        {skillCategories.map((skill, index) => (
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
