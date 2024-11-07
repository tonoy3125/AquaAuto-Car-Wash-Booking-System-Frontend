import HomePageNavbar from "@/pages/Shared/HomePageNavbar/HomePageNavbar";
import Experience from "../Experience/Experience";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";

const Home = () => {
  return (
    <div>
      <HomePageNavbar />
      <Experience />
      <AppointmentBanner />
    </div>
  );
};

export default Home;
