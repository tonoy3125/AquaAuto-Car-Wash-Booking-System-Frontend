import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useGetUserPastBookingQuery,
  useRemoveUserBookingMutation,
} from "@/redux/features/bookings/bookingsApi";
import { useGetAllServicesQuery } from "@/redux/features/services/serviceApi";
import { useAppSelector } from "@/redux/hooks";
import { TMetaData, TServiceData, TUserPayload } from "@/types";
import { TBookingData } from "@/types/bookingData.type";
import { TSlotData } from "@/types/slotData.type";
import { TUserData } from "@/types/userData.type";
import { DatePicker, Select, Table, TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import PastBookingDetails from "../PastBookingDetails/PastBookingDetails";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";

type TDataType = {
  key: React.Key;
  _id: string;
  serviceName: string;
  slotDate: string;
  formattedPrice: string;
  serviceDuration: number;
  serviceDurationUnit: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  customer: TUserData;
  service: TServiceData;
  slot: TSlotData;
  createdAt: string;
  updatedAt: string;
};
export type TTableData = Pick<
  TBookingData,
  | "service"
  | "slot"
  | "manufacturingYear"
  | "registrationPlate"
  | "vehicleBrand"
  | "vehicleModel"
  | "vehicleType"
>;

const PastBookings = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  // console.log(user);
  const userId = user?.id;
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const [selectedBooking, setSelectedBooking] = useState<TBookingData | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const queryParams = {};
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const {
    data: pastBookings,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserPastBookingQuery(
    {
      page: currentPage,
      userId,
      limit,
      ...params,
    },
    { pollingInterval: 5000 }
  );

  // console.log(pastBookings);
  // Fetching Services
  const { data: servicesData } = useGetAllServicesQuery(queryParams);
  const services = servicesData?.data || [];
  //   console.log(services);

  //   console.log(isLoading, isFetching);
  const metaData: TMetaData | undefined = pastBookings?.meta;
  //   console.log(metaData)
  const [removeUserBooking] = useRemoveUserBookingMutation();
  const token = useAppSelector(useCurrentToken);

  const tableData = pastBookings?.data?.map(
    ({
      _id,
      service,
      customer,
      slot,
      manufacturingYear,
      registrationPlate,
      vehicleBrand,
      vehicleModel,
      vehicleType,
      createdAt,
      updatedAt,
    }) => ({
      key: _id,
      _id,
      serviceName: service?.name || "N/A",
      slotDate: dayjs(slot?.date).format("DD.MM.YYYY") || "N/A",
      formattedPrice: service?.price ? `$ ${service.price}` : "N/A",
      slotStartTime: slot?.startTime || "N/A",
      slotEndTime: slot?.endTime || "N/A",
      slotStatus: slot?.isBooked || "N/A",
      serviceDuration: service?.duration,
      serviceDurationUnit: service?.durationUnit,
      manufacturingYear: manufacturingYear || 0, // Default if undefined
      registrationPlate: registrationPlate || "N/A", // Default if undefined
      vehicleBrand: vehicleBrand || "N/A",
      vehicleModel: vehicleModel || "N/A",
      vehicleType: vehicleType || "N/A",
      createdAt,
      updatedAt,
      customer,
      service,
      slot,
    })
  );

  const handleEditBooking = (booking: TBookingData) => {
    setSelectedBooking(booking); // Set the service to edit
    setModalOpen(true); // Open the modal
  };

  const handleRemoveBooking = async (_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeUserBooking({
            token,
            id: _id,
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The Booking has been removed from your Table.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
          refetch();
        } catch (error) {
          console.error("Failed to remove Booking:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove Booking from the Table.",
            icon: "error",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        }
      }
    });
  };

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Service Name",
      key: "serviceName",
      dataIndex: "serviceName",
    },
    {
      title: "Service Price",
      key: "formattedPrice",
      dataIndex: "formattedPrice",
    },
    {
      title: "Slot Date",
      key: "slotDate",
      dataIndex: "slotDate",
    },
    {
      title: "Service Duration",
      key: "duration",
      dataIndex: "duration",
      render: (_, record) =>
        `${record.serviceDuration} ${record.serviceDurationUnit || ""}`,
    },
    {
      title: "Action",
      key: "x",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-5">
            <div
              onClick={() => handleEditBooking(record)}
              className="cursor-pointer"
            >
              <FiEye className="text-2xl" />
            </div>
            <div
              onClick={() => handleRemoveBooking(record.key as string)}
              className="cursor-pointer"
            >
              <RiDeleteBin5Line className="text-2xl" />
            </div>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    pagination,
    _filters,
    _sorter,
    _extra
  ) => {
    setCurrentPage(pagination.current || 1);
    refetch();
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">Past Bookings</h1>

      <div className="mt-10">
        <Table<TDataType>
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          tableLayout="fixed"
          pagination={{
            current: currentPage,
            pageSize: limit,
            total: metaData?.total || 0, // Total from API response
          }}
          onChange={onChange}
          scroll={{ x: 768 }}
        />
      </div>
      {isModalOpen && selectedBooking && (
        <PastBookingDetails
          open={isModalOpen}
          setOpen={setModalOpen}
          booking={selectedBooking}
          id={selectedBooking._id}
        />
      )}
    </div>
  );
};

export default PastBookings;
