const AppointmentBanner = () => {
  return (
    <div className="w-full pb-56 relative">
      <div className="border relative">
        <img
          className="w-full h-[40vh] lg:h-[30vh]  object-cover"
          src="https://i.ibb.co.com/0jzgV10/Rectangle-755-1.png"
          alt=""
        />
        <div className="absolute inset-0 bg-[#0F0452] bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center ">
          <h3 className="font-poppins font-bold text-4xl text-white text-center mb-1">
            Schedule Your appointment today
          </h3>
          <p className="font-poppins text-base text-white text-center mb-4">
            Strateg breed better design, but brand strategies don materialize
          </p>
          <p className="font-poppins text-white text-2xl font-bold text-center">
            017 6590 0905
          </p>
        </div>
      </div>
      <div className="absolute right-0 bottom-28">
        <img
          src="https://i.ibb.co.com/fkR54gy/kisspng-2017-ford-mustang-2018-ford-mustang-shelby-mustang-ford-mustang-shelby-gt500-car-5a74aa5a8a8.png"
          alt=""
        />
      </div>
      <div className="absolute left-0 bottom-32">
        <img
          src="https://i.ibb.co.com/MfVL9Pn/kisspng-2017-honda-accord-hybrid-car-honda-s-mx-honda-civi-blue-honda-accord-hybrid-car-5a745a231e81.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default AppointmentBanner;
