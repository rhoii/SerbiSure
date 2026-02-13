import { appName } from "../data/system";

function BrandingHeader() {
  return (
    <header>
      <h1 className="hero-brand">{appName}</h1>
    </header>
  );
}

export default BrandingHeader;
