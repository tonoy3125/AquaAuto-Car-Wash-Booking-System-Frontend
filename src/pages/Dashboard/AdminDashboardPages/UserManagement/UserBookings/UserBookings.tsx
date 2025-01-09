import {
  useGetAllBookingsQuery,
  useRemoveBookingMutation,
} from "@/redux/features/bookings/bookingsApi";
import { TMetaData, TServiceData } from "@/types";
import { TBookingData } from "@/types/bookingData.type";
import { Input, Select, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import dayjs from "dayjs";
import UserBookingDetails from "./UserBookingDetails/UserBookingDetails";
import { TUserData } from "@/types/userData.type";
import { TSlotData } from "@/types/slotData.type";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetAllServicesQuery } from "@/redux/features/services/serviceApi";

type TDataType = {
  key: React.Key;
  _id: string;
  customerName: string;
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
  | "customer"
  | "service"
  | "slot"
  | "manufacturingYear"
  | "registrationPlate"
  | "vehicleBrand"
  | "vehicleModel"
  | "vehicleType"
>;

const UserBookings = () => {
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const queryParams = {};
  const [selectedBooking, setSelectedBooking] = useState<TBookingData | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: servicesData } = useGetAllServicesQuery(queryParams);
  const services = servicesData?.data || [];

  const { data: bookingData, isFetching } = useGetAllBookingsQuery({
    page: currentPage,
    limit,
    ...params,
  });
  const [removeBooking] = useRemoveBookingMutation();
  const token = useAppSelector(useCurrentToken);

  //   console.log(bookingData);
  const metaData: TMetaData | undefined = bookingData?.meta;

  const tableData: TDataType[] | undefined = bookingData?.data?.map(
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
      customerName: customer?.name || "N/A",
      customerEmail: customer?.email || "N/A",
      customerPhone: customer?.phone || "N/A",
      customerAddress: customer?.address || "N/A",
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
          await removeBooking({
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

  // Service selection handler
  const handleBookingChange = (value: string) => {
    setParams((prev) => ({
      ...prev,
      serviceId: value || undefined, // Set serviceId or remove it if cleared
    }));
    setCurrentPage(1); // Reset to the first page when applying a filter
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setParams((prev) => ({
      ...prev,
      searchTerm: value || undefined, // Set or clear the searchTerm
    }));
    setCurrentPage(1);
  };

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Customer Name",
      key: "customerName",
      dataIndex: "customerName",
    },
    {
      title: "Service Name",
      key: "serviceName",
      dataIndex: "serviceName",
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
      title: "Service Price",
      key: "formattedPrice",
      dataIndex: "formattedPrice",
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
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">User Bookings</h1>

      <div className="mb-5 flex items-center justify-end gap-4">
        <Input
          placeholder="Search Bookings By Customer Name & Service Name..."
          allowClear
          style={{ width: "25%" }}
          onChange={handleSearchChange}
        />
        <Select
          placeholder="Filter by Service"
          allowClear
          style={{ width: 300 }}
          onChange={handleBookingChange}
          options={services.map((service) => ({
            label: service.name,
            value: service._id,
          }))}
        />
      </div>

      {/* Booking Filter Dropdown */}

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
        <UserBookingDetails
          open={isModalOpen}
          setOpen={setModalOpen}
          booking={selectedBooking}
          id={selectedBooking._id}
        />
      )}
    </div>
  );
};

export default UserBookings;
