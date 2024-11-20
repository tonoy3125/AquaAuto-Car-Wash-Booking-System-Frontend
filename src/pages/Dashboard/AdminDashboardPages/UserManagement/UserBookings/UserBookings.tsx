import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookingsApi";
import { TMetaData } from "@/types";
import { TBookingData } from "@/types/bookingData.type";
import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import dayjs from "dayjs";

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
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: bookingData,
    isLoading,
    isFetching,
  } = useGetAllBookingsQuery({ page: currentPage, limit, ...params });

  //   console.log(bookingData);
  const metaData: TMetaData | undefined = bookingData?.meta;

  const tableData = bookingData?.data?.map(
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
      serviceName: service?.name || "N/A",
      slotDate: dayjs(slot?.date).format("DD.MM.YYYY") || "N/A",
      formattedPrice: service?.price ? `$ ${service.price}` : "N/A",
      serviceDuration: service?.duration,
      serviceDurationUnit: service?.durationUnit,
      manufacturingYear: manufacturingYear || 0, // Default if undefined
      registrationPlate: registrationPlate || "N/A", // Default if undefined
      vehicleBrand: vehicleBrand || "N/A",
      vehicleModel: vehicleModel || "N/A",
      vehicleType: vehicleType || "N/A",
      createdAt,
      updatedAt,
    })
  );

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
              // onClick={() => handleRemoveSlot(record.key as string)}
              className="cursor-pointer"
            >
              <FiEye className="text-2xl" />
            </div>
            <div
              // onClick={() => handleRemoveSlot(record.key as string)}
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
      <h1 className="font-poppins font-bold text-2xl mb-5">Manage Service</h1>
      {/* Service Filter Dropdown */}

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
    </div>
  );
};

export default UserBookings;
