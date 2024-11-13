import { useState } from "react";
import { Button, Modal } from "antd";

const AddService = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">Add Service</h1>
      {/* <div className="flex items-center justify-center mt-32">
        <button
          //   type="submit"
          className="px-5 py-2 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md"
        >
          Add Service
        </button>
      </div> */}
      <>
        <div className="flex items-center justify-center mt-32">
          <Button
            className="px-8 py-5 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md text-lg"
            // type="primary"
            onClick={showLoading}
          >
            Add Service
          </Button>
        </div>
        <Modal
          title={loading ? "Loading Modal" : "Add Service"}
          footer={
            <Button
              className="px-8 py-5 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md text-lg"
              //   type="primary"
              onClick={showLoading}
            >
              Submit
            </Button>
          }
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <form className="mt-5">
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Name
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="name"
                id=""
                placeholder="Enter Your Name"
                // {...register("email", {
                //   required: "Email is Required",
                // })}
              />
              {/* {errors.email && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.email.message)}
                </p>
              )} */}
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Description
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="description"
                id=""
                placeholder="Enter Your Description"
                // {...register("email", {
                //   required: "Email is Required",
                // })}
              />
              {/* {errors.email && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.email.message)}
                </p>
              )} */}
            </div>
            <div className="mb-4 flex items-center gap-5">
              <div>
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  Price
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                  type="price"
                  id=""
                  placeholder="Enter Your Price"
                  // {...register("email", {
                  //   required: "Email is Required",
                  // })}
                />
                {/* {errors.email && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.email.message)}
                </p>
              )} */}
              </div>
              <div>
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  Duration
                </h2>
                <div className="flex items-center gap-5">
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                    type="duration"
                    id=""
                    placeholder="Enter Your Duration"
                    // {...register("email", {
                    //   required: "Email is Required",
                    // })}
                  />
                  <select
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                    id="productDurationUnit"
                    // {...register("durationUnit", {
                    //   required: "Product Duration Unit is Required",
                    // })}
                  >
                    <option value="">Select Time</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
                {/* {errors.email && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.email.message)}
                </p>
              )} */}
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Upload Image
              </h2>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-[#43B9B2] border-dashed rounded-lg cursor-pointer bg-[#ECF8F7] dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-black font-poppins text-center sem">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-black font-poppins">
                      SVG, PNG, JPG or GIF{" "}
                    </p>
                  </div>
                  <input
                    className="hidden"
                    id="dropzone-file"
                    type="file"
                    name="imageFiles"
                    multiple
                    //   onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Upload Icon
              </h2>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-[#43B9B2] border-dashed rounded-lg cursor-pointer bg-[#ECF8F7] dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-black font-poppins text-center sem">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-black font-poppins">
                      SVG, PNG, JPG or GIF{" "}
                    </p>
                  </div>
                  <input
                    className="hidden"
                    id="dropzone-file"
                    type="file"
                    name="imageFiles"
                    multiple
                    //   onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default AddService;
