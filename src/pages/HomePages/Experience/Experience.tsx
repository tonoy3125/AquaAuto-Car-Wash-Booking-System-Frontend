import { GiCheckMark } from "react-icons/gi";

const Experience = () => {
  return (
    <div className="mt-[800px] md:mt-80 lg:max-w-6xl mx-auto relative mb-60">
      <div className="flex items-center justify-between relative">
        {/* Main Image */}
        <div className="relative z-10">
          <img src="https://i.ibb.co.com/c88xRc8/Rectangle-744-1.png" alt="" />
        </div>
        <div>
          <div className="flex items-center">
            <h3
              className="relative text-[#E81C2E] font-barlow font-bold uppercase pl-28 before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:bg-[#E81C2E] before:h-px before:w-20 before:mr-4"
              style={{ lineHeight: "1.2", letterSpacing: "6px" }}
            >
              Servicing since 1986
            </h3>
          </div>
          <p className="font-poppins font-medium mt-10">
            With Over 35 Years of Experience, We've Been Proudly Delivering{" "}
            <br />
            Exceptional Service and Expertise Since 1986, Building Trust and{" "}
            <br /> Quality in Every Project
          </p>
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-3">
              <div className="border border-[#EE3131] w-6 h-6 flex items-center justify-center rounded-full">
                <GiCheckMark className="text-[#EE3131]" />
              </div>
              <p className="font-poppins font-medium text-[#626472]">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#EE3131] w-6 h-6 flex items-center justify-center rounded-full">
                <GiCheckMark className="text-[#EE3131]" />
              </div>
              <p className="font-poppins font-medium text-[#626472]">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#EE3131] w-6 h-6 flex items-center justify-center rounded-full">
                <GiCheckMark className="text-[#EE3131]" />
              </div>
              <p className="font-poppins font-medium text-[#626472]">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
            </div>
          </div>
        </div>
        {/* Sub Image */}
        <div className="absolute -left-20 -bottom-12 z-0">
          <img src="https://i.ibb.co.com/HnrkdPN/Group.png" alt="" />
        </div>
      </div>
      {/* Experience Image */}
      <div className="relative z-20">
        <div className="absolute bg-[#EE3131] -bottom-24 left-60">
          <img src="https://i.ibb.co.com/MkRqJxH/Asset-1-2-1.png" alt="" />
        </div>
        <div className="absolute left-[320px] -bottom-6">
          <h1 className="text-9xl font-poppins font-bold text-white">35</h1>
          <h1
            className="text-2xl font-poppins font-bold text-white text-center"
            style={{ lineHeight: "1.2", letterSpacing: "1px" }}
          >
            Years of <br /> Experience
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Experience;
