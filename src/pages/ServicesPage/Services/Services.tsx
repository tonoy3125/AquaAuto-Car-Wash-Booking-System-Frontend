import ServiceBanner from "@/components/ServiceBanner/ServiceBanner";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import AllServices from "../AllServices/AllServices";

const Services = () => {
  return (
    <div>
      <Navbar />
      <ServiceBanner />
      <AllServices />
      <Footer />
    </div>
  );
};

export default Services;
