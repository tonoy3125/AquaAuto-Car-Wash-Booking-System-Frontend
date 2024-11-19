import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetAllSlotQuery,
  useRemoveSlotMutation,
  useUpdateIsBookedMutation,
} from "@/redux/features/slot/slotApi";
import { useAppSelector } from "@/redux/hooks";
import { TMetaData } from "@/types";
import { TSlotData } from "@/types/slotData.type";
import { Table, TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import Swal from "sweetalert2";

type TDataType = {
  key: React.Key;
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  createdAt: string;
  updatedAt: string;
};
export type TTableData = Pick<
  TSlotData,
  "service" | "date" | "startTime" | "endTime" | "isBooked"
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

  const [updateIsBooked] = useUpdateIsBookedMutation();
  const [removeSlot] = useRemoveSlotMutation();
  const token = useAppSelector(useCurrentToken);

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

  const handleRemoveSlot = async (_id: string) => {
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
          await removeSlot({
            token,
            id: _id,
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The Slot has been removed from your Table.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove Slot:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove Slot from the Table.",
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
                  ? "bg-green-500"
                  : record.isBooked === "canceled"
                  ? "bg-red-500"
                  : "bg-yellow-500"
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
                  onValueChange={async (value) => {
                    const toastId = toast.loading("Updating Slot Status...");
                    try {
                      // Use async/await to handle mutation and unwrap response
                      const res = await updateIsBooked({
                        id: record._id,
                        isBooked: value,
                      }).unwrap();

                      // Display success toast
                      toast.success(
                        res.message || "Slot status updated Successfully!",
                        {
                          id: toastId,
                          duration: 3000,
                        }
                      );
                    } catch (error: any) {
                      //   console.error("Error updating booking status:", error);

                      // Display error toast
                      toast.error(
                        error?.data?.message || "Something went wrong!",
                        {
                          id: toastId,
                          duration: 3000,
                        }
                      );
                    }
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
          <div
            onClick={() => handleRemoveSlot(record.key as string)}
            className="cursor-pointer"
          >
            <RiDeleteBin5Line className="text-2xl" />
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
