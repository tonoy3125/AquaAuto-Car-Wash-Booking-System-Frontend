const ContactForm = () => {
  return (
    <div className="bg-[#F7F7FA]">
      <div className="lg:max-w-6xl mx-auto pb-10 ">
        <div className="bg-[#fff] p-3 sm:p-4 semi-sm:p-5 md:p-20  rounded-md ">
          <h1 className="font-poppins text-xl sm:text-2xl semi-sm:text-3xl md:text-4xl font-bold text-center mb-5">
            Contact Information
          </h1>
          <hr className="bg-[#EE3131] h-1 w-12 mx-auto" />
          <form className="mt-10">
            <div className="mb-5">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
                Your Name
              </h2>
              <input
                className="pt-4 pb-4 pl-5 w-full border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg  focus:outline-none "
                type="name"
                id=""
              />
            </div>
            <div className="mb-5">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
                Your Email
              </h2>
              <input
                className="pt-4 pb-4 pl-5 w-full border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg  focus:outline-none "
                type="name"
                id=""
              />
            </div>
            <div className="mb-5">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
                Subject
              </h2>
              <input
                className="pt-4 pb-4 pl-5 w-full border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg  focus:outline-none "
                type="name"
                id=""
              />
            </div>
            <div>
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
                Your message (optional)
              </h2>
              <textarea
                id="order"
                rows={4}
                className="pt-4 pb-4 pl-5 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg  focus:outline-none "
              ></textarea>
            </div>
            <input
              className="px-16 py-3 bg-[#EE3131] hover:bg-[#23282d] text-base font-poppins text-[#fff] font-medium rounded-lg border  mt-7 cursor-pointer"
              style={{ letterSpacing: ".3px" }}
              type="Submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
