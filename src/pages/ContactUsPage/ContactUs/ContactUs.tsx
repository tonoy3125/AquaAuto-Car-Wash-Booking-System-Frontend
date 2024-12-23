import ContactUsBanner from "@/components/ContactUsBanner/ContactUsBanner";
import Footer from "@/pages/Shared/Footer/Footer";
import Navbar from "@/pages/Shared/Navbar/Navbar";
import ContactItem from "../ContactItem/ContactItem";

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <ContactUsBanner />
      <ContactItem />
      <Footer />
    </div>
  );
};

export default ContactUs;
