import { systemInfo } from "../data/system";

function RegistrationFooter() {
    return (
        <footer>
            <p className="muted-footer" style={{ textAlign: "center" }}>
                © 2026 {systemInfo.name} — {systemInfo.tagline} | v{systemInfo.version}
            </p>
        </footer>
    );
}

export default RegistrationFooter;
