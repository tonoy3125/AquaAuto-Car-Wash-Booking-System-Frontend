import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div className="text-center xs:mt-16 sm:mt-10 semi-sm:mt-0 md:mt-0 lg:mt-28 pb-20 ">
      <Player
        autoplay
        loop
        src="https://lottie.host/7a93e9e4-3006-4472-9baa-0a2198c81a09/nRoR6nITji.json"
        className="md:w-[700px] "
      ></Player>
      <h2 className="md:text-5xl text-black font-bold">NOT FOUND</h2>
      <Link to="/">
        <button className="btn btn-accent text-white mt-7">Go Home</button>
      </Link>
    </div>
  );
};

export default ErrorElement;
