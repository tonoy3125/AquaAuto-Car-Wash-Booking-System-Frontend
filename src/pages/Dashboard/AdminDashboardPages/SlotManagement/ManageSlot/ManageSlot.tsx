import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllSlotQuery } from "@/redux/features/slot/slotApi";
import { TMetaData } from "@/types";
import { TSlotData } from "@/types/slotData.type";
import { Table, TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

type TDataType = {
  key: React.Key;
  _id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
export type TTableData = Pick<
  TSlotData,
  "service" | "date" | "startTime" | "endTime"
>;

const ManageSlot = () => {
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  //   const [selectedService, setSelectedService] = useState<TServiceData | null>(
  //     null
  //   );
  const {
    data: slotData,
    isLoading,
    isFetching,
  } = useGetAllSlotQuery({ page: currentPage, limit, ...params });
  //   console.log(serviceData);

  console.log(isLoading, isFetching);
  const metaData: TMetaData | undefined = slotData?.meta;

  const tableData = slotData?.data?.map(
    ({
      _id,
      service,
      date,
      startTime,
      endTime,
      isBooked,
      createdAt,
      updatedAt,
    }) => ({
      key: _id,
      _id,
      date: dayjs(date).format("DD.MM.YYYY"),
      startTime,
      endTime,
      serviceName: service?.name,
      isBooked,
      createdAt,
      updatedAt,
    })
  );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Service Name",
      key: "serviceName",
      dataIndex: "serviceName",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Featured",
          value: "featured",
        },
        {
          text: "Price High To Low",
          value: "price_high_to_low",
        },
        {
          text: "Price Low To High",
          value: "price_low_to_high",
        },
      ],
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
    {
      title: "Status",
      key: "isBooked",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            {/* Status Indicator */}
            <span
              className={`w-3 h-3 rounded-full ${
                record.isBooked === "booked"
                  ? "bg-blue-500"
                  : record.isBooked === "canceled"
                  ? "bg-red-500"
                  : "bg-gray-300"
              }`}
            ></span>

            {/* Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-gray-700 border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {record.isBooked === "booked"
                    ? "Booked"
                    : record.isBooked === "canceled"
                    ? "Canceled"
                    : "Available"}
                  <span className="ml-1 text-gray-500">&#9662;</span>{" "}
                  {/* Down arrow */}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={record.isBooked}
                  onValueChange={(value) => {
                    // Update logic here (API call or state update)
                    console.log(
                      `Changing booking status for ${record._id} to ${value}`
                    );
                    updateSlotStatus(record._id, value); // Example function call
                  }}
                >
                  <DropdownMenuRadioItem value="available">
                    Available
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="booked">
                    Booked
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="canceled">
                    Canceled
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "x",
      render: (_, record) => {
        return (
          <div className="flex items-center  gap-5">
            <button
              //   onClick={() => handleEditService(record)}
              className="bg-[#43B9B2] px-6 py-2 font-poppins text-base rounded-lg text-white"
            >
              Edit
            </button>
            <button
              //   onClick={() => handleRemoveService(record.key as string)}
              className="bg-[#43B9B2] px-6 py-2 font-poppins text-base rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    pagination,
    filters,
    _sorter,
    _extra
  ) => {
    setCurrentPage(pagination.current || 1);
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">Manage Service</h1>
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

export default ManageSlot;
