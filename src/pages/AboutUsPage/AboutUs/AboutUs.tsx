import AboutUsBanner from "@/components/AboutUsBanner/AboutUsBanner";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import Faq from "../Faq/Faq";
import Team from "../Team/Team";
import History from "../History/History";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <AboutUsBanner />
      <Faq />
      <History />
      <Team />
      <Footer />
    </div>
  );
};

export default AboutUs;
