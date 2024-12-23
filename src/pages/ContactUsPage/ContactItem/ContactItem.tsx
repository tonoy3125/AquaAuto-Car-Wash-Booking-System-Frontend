const ContactItem = () => {
  return (
    <div className="bg-[#F7F7FA]">
      <div className="lg:max-w-6xl mx-auto pb-10 ">
        <h1 className="font-poppins text-xl sm:text-2xl semi-sm:text-3xl md:text-4xl font-bold text-center mb-5">
          Want to Contact With Us?
        </h1>
        <hr className="bg-[#EE3131] h-1 w-12 mx-auto" />
        <p
          className="font-poppins text-center text-[#626472] mt-5 mx-5 md:mx-0"
          style={{ lineHeight: "1.5", letterSpacing: "1px" }}
        >
          Get in Touch with Us!Feel free to reach out for any questions,{" "}
          <br className="hidden md:block" /> support, or feedback. We're here to
          help!
        </p>
        <div className="bg-[#fff] grid grid-cols-1 md:grid-cols-3 py-20 gap-10 rounded-md mt-20">
          <div className="flex items-center flex-col space-y-3">
            <img src="https://i.ibb.co.com/86F17kc/address.png" alt="" />
            <p className="font-poppins text-sm">
              915 Hilldale Lane Maryville,
              <br /> TN 37803, United States
            </p>
          </div>
          <div className="flex items-center flex-col">
            <img
              className="mb-6"
              src="https://i.ibb.co.com/h1rZPbN/contact.png"
              alt=""
            />
            <p className="font-poppins text-sm">+91 386-454-0624(Toll Free)</p>
            <p className="font-poppins text-sm">+91 386-433-9096</p>
          </div>
          <div className="flex items-center flex-col">
            <img
              className="mb-10"
              src="https://i.ibb.co.com/G9vkG7S/email.png"
              alt=""
            />
            <p className="font-poppins text-sm">contact.dealer@example.com</p>
            <p className="font-poppins text-sm">servicecenter@domain.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
