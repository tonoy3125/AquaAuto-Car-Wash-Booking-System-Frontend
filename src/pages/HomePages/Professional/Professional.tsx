import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import "./Professional.css";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";

const Professional = () => {
  return (
    <div className="mb-20 ">
      <div className="mx-5">
        <h3
          className="relative text-[#E81C2E] font-barlow font-bold uppercase text-start lg:text-center pl-28 before:content-[''] before:absolute md:before:left-0 lg:before:left-[750px] before:top-1/2 before:transform before:-translate-y-1/2 before:bg-[#E81C2E] before:h-px before:w-20 before:mr-4"
          style={{ lineHeight: "1.2", letterSpacing: "6px" }}
        >
          We are Professional
        </h3>
        <p className="font-poppins font-medium mt-5 text-[#626472] flex items-start lg:items-center justify-start lg:justify-center text-start lg:text-center">
          Strateg breed better design, but brand strategies don materialize{" "}
          <br /> on their own They require coope and more.
        </p>
      </div>
      <div className="mt-10 max-w-5xl mx-auto custom-slider">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="https://i.ibb.co.com/v4Dg4VW/RT-red-car-clean-1-1.png"
              srcSet="https://i.ibb.co.com/v4Dg4VW/RT-red-car-clean-1-1.png"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="https://i.ibb.co.com/ssscS9F/Microsoft-Teams-image.png"
              srcSet="https://i.ibb.co.com/ssscS9F/Microsoft-Teams-image.png"
              alt="Image two"
            />
          }
          handle={
            <div className="custom-handle">
              <div className="custom-handle-circle">
                <div className="custom-handle-icon flex items-center">
                  <span>
                    <MdOutlineArrowLeft className="text-2xl" />
                  </span>
                  <span>
                    <MdOutlineArrowRight className="text-2xl" />
                  </span>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Professional;
