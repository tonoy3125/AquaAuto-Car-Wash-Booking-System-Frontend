import ReviewBanner from "@/components/ReviewBanner/ReviewBanner";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import Testimonial from "@/components/Testimonial/Testimonial";

const AllReviews = () => {
  return (
    <div>
      <Navbar />
      <ReviewBanner />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default AllReviews;
