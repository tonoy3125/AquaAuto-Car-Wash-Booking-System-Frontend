import ContactUsBanner from "@/components/ContactUsBanner/ContactUsBanner";
import Footer from "@/pages/Shared/Footer/Footer";
import Navbar from "@/pages/Shared/Navbar/Navbar";
import ContactItem from "../ContactItem/ContactItem";
import ContactForm from "../ContactForm/ContactForm";
import Map from "../Map/Map";

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <ContactUsBanner />
      <ContactItem />
      <ContactForm />
      <Map />
      <Footer />
    </div>
  );
};

export default ContactUs;
