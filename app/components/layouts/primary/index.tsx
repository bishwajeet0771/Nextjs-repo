import Footer from "./footer";
import Header from "./header";
// import LocalBusinessJsonLdScript from "@/app/seo/Localjson";
// import OrganizationSchema from "@/app/seo/OraganisationSchema";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      {/* <OrganizationSchema />
      <LocalBusinessJsonLdScript /> */}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
