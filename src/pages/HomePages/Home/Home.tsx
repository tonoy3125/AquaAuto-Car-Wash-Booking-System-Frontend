import HomePageNavbar from "@/pages/Shared/HomePageNavbar/HomePageNavbar";
import Experience from "../Experience/Experience";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Footer from "@/pages/Shared/Footer/Footer";
import Professional from "../Professional/Professional";
import Reviews from "../Review/Reviews";

const Home = () => {
  return (
    <div>
      <HomePageNavbar />
      <Experience />
      <Professional />
      <AppointmentBanner />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
