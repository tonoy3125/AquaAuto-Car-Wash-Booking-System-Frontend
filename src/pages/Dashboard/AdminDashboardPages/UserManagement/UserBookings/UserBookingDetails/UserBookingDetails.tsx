import { Modal } from "antd";
import { useState } from "react";
import React, { Dispatch, SetStateAction } from "react";

type TUserBookingDetailsProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  booking: any;
  id: string;
};

const UserBookingDetails: React.FC<TUserBookingDetailsProps> = ({
  open,
  setOpen,
  booking,
}) => {
  const [loading] = useState<boolean>(false);

  return (
    <div>
      <Modal
        title={loading ? "Loading Modal" : "Booking Details"}
        footer={null}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div>
          <h1 className="font-poppins font-semibold text-xl border-b-[1px] border-b-black pb-[1px] mt-3">
            Customer Details :{" "}
          </h1>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins mt-3">
            <span className="font-bold text-black ">Customer Name: </span>{" "}
            {booking?.customerName}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Customer Email: </span>{" "}
            {booking?.customerEmail}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Customer Phone: </span>{" "}
            {booking?.customerPhone}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Customer Address: </span>{" "}
            {booking?.customerAddress}
          </h2>
        </div>
        <div>
          <h1 className="font-poppins font-semibold text-xl border-b-[1px] border-b-black pb-[1px] mt-3">
            Service Details :{" "}
          </h1>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins mt-3">
            <span className="font-bold text-black ">Service Name: </span>{" "}
            {booking?.serviceName}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Price: </span>{" "}
            {booking?.formattedPrice}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Duration: </span>{" "}
            {booking?.serviceDuration} {booking?.serviceDurationUnit}
          </h2>
        </div>
        <div>
          <h1 className="font-poppins font-semibold text-xl border-b-[1px] border-b-black pb-[1px] mt-3">
            Slot Details :{" "}
          </h1>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins mt-3">
            <span className="font-bold text-black ">Date: </span>{" "}
            {booking?.slotDate}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Start Time: </span>{" "}
            {booking?.slotStartTime}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">End Time: </span>{" "}
            {booking?.slotEndTime}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Status: </span>{" "}
            {booking?.slotStatus}
          </h2>
        </div>
        <div>
          <h1 className="font-poppins font-semibold text-xl border-b-[1px] border-b-black pb-[1px] mt-3">
            Vehicle Details :{" "}
          </h1>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins mt-3">
            <span className="font-bold text-black ">Vehicle type: </span>{" "}
            {booking?.vehicleType}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Vehicle Brand: </span>{" "}
            {booking?.vehicleBrand}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Vehicle Model: </span>{" "}
            {booking?.vehicleModel}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Manufacturing Year: </span>{" "}
            {booking?.manufacturingYear}
          </h2>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-2 font-poppins">
            <span className="font-bold text-black ">Registration Plate: </span>{" "}
            {booking?.registrationPlate}
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default UserBookingDetails;
