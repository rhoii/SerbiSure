import { BrandingHeader, RegistrationForm, RegistrationFooter } from "../components";
import { appName, systemInfo, userRoles } from "../data/system";
import { skillCategories } from "../data/skills";

function Registration() {
  return (
    <main className="page-wrapper">
      <BrandingHeader title={appName} />
      <RegistrationForm
        title="Registration"
        subtitle={`Join ${systemInfo.totalWorkers}+ verified workers in ${systemInfo.region}`}
        roles={userRoles}
        skills={skillCategories}
      />
      <RegistrationFooter
        name={systemInfo.name}
        tagline={systemInfo.tagline}
        version={systemInfo.version}
      />
    </main>
  );
}

export default Registration;
