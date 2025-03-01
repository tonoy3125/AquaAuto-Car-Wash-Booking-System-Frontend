import HomePageNavbar from "@/pages/Shared/HomePageNavbar/HomePageNavbar";
import Experience from "../Experience/Experience";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Footer from "@/pages/Shared/Footer/Footer";
import Professional from "../Professional/Professional";
import Reviews from "../Review/Reviews";
import OurServices from "../OurServices/OurServices";
import Equipment from "../Equipment/Equipment";
import Membership from "../Membership/Membership";

const Home = () => {
  return (
    <div>
      <HomePageNavbar />
      <Equipment />
      <Experience />
      <OurServices />
      <Professional />
      <AppointmentBanner />
      <Membership />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
