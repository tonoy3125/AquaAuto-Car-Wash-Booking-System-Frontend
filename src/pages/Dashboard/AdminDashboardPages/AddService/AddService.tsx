import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";

const AddService = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Only get the first file
    console.log(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Set image preview URL
    }
  };

  const handleIconFileChange = (event) => {
    const file = event.target.files[0]; // Only get the first file
    console.log(file);
    if (file) {
      setSelectedIcon(URL.createObjectURL(file)); // Set image preview URL
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">Add Service</h1>
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
          footer={null}
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Name
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="text"
                id=""
                placeholder="Enter Your Name"
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.name.message)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Description
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="text"
                id=""
                placeholder="Enter Your Description"
                {...register("description", {
                  required: "Description is Required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.description.message)}
                </p>
              )}
            </div>
            <div className="mb-4 flex items-center gap-5">
              <div>
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  Price
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                  type="number"
                  id=""
                  placeholder="Enter Your Price"
                  {...register("price", {
                    required: "Price is Required",
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                    {String(errors.price.message)}
                  </p>
                )}
              </div>
              <div>
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  Duration
                </h2>
                <div className="flex items-center gap-5">
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                    type="text"
                    id=""
                    placeholder="Enter Your Duration"
                    {...register("duration", {
                      required: "Service Duration is Required",
                    })}
                  />
                  <select
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                    id="productDurationUnit"
                    {...register("durationUnit", {
                      required: "Service Duration Unit is Required",
                    })}
                  >
                    <option value="">Select Time</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
                {errors.duration && (
                  <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                    {String(errors.duration.message)}
                  </p>
                )}
                {errors.durationUnit && (
                  <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                    {String(errors.durationUnit.message)}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Upload Image
              </h2>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-[#43B9B2] border-dashed rounded-lg cursor-pointer bg-[#ECF8F7] dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    className="hidden"
                    id="dropzone-file"
                    type="file"
                    name="imageFile"
                    accept="image/*" // Allow only image files
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {/* Image preview section */}
              {selectedImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                  />
                </div>
              )}
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
                    name="iconFile"
                    accept="image/*"
                    onChange={handleIconFileChange}
                  />
                </label>
              </div>
              {/* Image preview section */}
              {selectedIcon && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={selectedIcon}
                    alt="Selected"
                    className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                className="px-8 py-5 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md text-lg"
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default AddService;
