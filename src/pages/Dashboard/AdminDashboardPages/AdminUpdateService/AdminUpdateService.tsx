import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useUpdateServiceMutation } from "@/redux/features/services/serviceApi";
import { useAppSelector } from "@/redux/hooks";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React, { Dispatch, SetStateAction } from "react";

type TAdminUpdateServiceProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  service: any;
  id: string;
};

const AdminUpdateService: React.FC<TAdminUpdateServiceProps> = ({
  open,
  setOpen,
  service,
  id,
}) => {
  const [loading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const token = useAppSelector(useCurrentToken);
  const [updateService] = useUpdateServiceMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 0,
      durationUnit: "",
    },
  });

  useEffect(() => {
    if (service) {
      // Reset the form when the `service` prop changes
      reset({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        durationUnit: service.durationUnit,
      });
      if (service.image) {
        setImage(service.image);
      }
      if (service.icon) {
        setIcon(service.icon);
      }
    }
  }, [service, reset]); // Reset on service change

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedIcon(file);
    }
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Uploading Service...");
    const serviceData = { ...data };
    const formData = new FormData();
    formData.append("data", JSON.stringify(serviceData));
    if (selectedImage) formData.append("image", selectedImage);
    if (selectedIcon) formData.append("icon", selectedIcon);

    try {
      const res = await updateService({ token, formData, id }).unwrap();
      // console.log(res);
      toast.success(res.message || "Service Updated Successfully", {
        id: toastId,
        duration: 3000,
      });
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div>
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
            <div className="mt-4 flex justify-center">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                />
              ) : image ? (
                <img
                  src={image}
                  alt="Service Image"
                  className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                />
              ) : null}
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
                  name="iconFile"
                  accept="image/*"
                  onChange={handleIconFileChange}
                />
              </label>
            </div>
            {/* Image preview section */}
            <div className="mt-4 flex justify-center">
              {selectedIcon ? (
                <img
                  src={URL.createObjectURL(selectedIcon)}
                  alt="Selected Icon"
                  className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                />
              ) : icon ? (
                <img
                  src={icon}
                  alt="Service Icon"
                  className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                />
              ) : null}
            </div>
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
    </div>
  );
};

export default AdminUpdateService;
