import Footer from "@/pages/Shared/Footer/Footer";
import Navbar from "@/pages/Shared/Navbar/Navbar";
import { useGetSingleServiceByIdQuery } from "@/redux/features/services/serviceApi";
import { useParams } from "react-router-dom";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

const SingleService = () => {
  const { id } = useParams();

  const { data: singleService } = useGetSingleServiceByIdQuery(id!);
  const service = singleService?.data;
  //   console.log(service);

  return (
    <div>
      <Navbar />
      <ServiceDetails service={service} />
      <Footer />
    </div>
  );
};

export default SingleService;
