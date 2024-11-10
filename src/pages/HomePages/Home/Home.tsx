import HomePageNavbar from "@/pages/Shared/HomePageNavbar/HomePageNavbar";
import Experience from "../Experience/Experience";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Footer from "@/pages/Shared/Footer/Footer";
import Professional from "../Professional/Professional";

const Home = () => {
  return (
    <div>
      <HomePageNavbar />
      <Experience />
      <Professional />
      <AppointmentBanner />
      <Footer />
    </div>
  );
};

export default Home;
