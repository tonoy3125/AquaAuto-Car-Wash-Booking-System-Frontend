import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  useGetAllServicesQuery,
  useRemoveServiceMutation,
} from "@/redux/features/services/serviceApi";
import { TMetaData, TServiceData } from "@/types";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import AdminUpdateService from "../AdminUpdateService/AdminUpdateService";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

type TDataType = {
  key: React.Key;
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  durationUnit: string;
  image: string;
  icon: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TTableData = Pick<
  TServiceData,
  "name" | "description" | "duration" | "durationUnit" | "image" | "icon"
>;

const ManageServices = () => {
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<TServiceData | null>(
    null
  );
  const {
    data: serviceData,
    isLoading,
    isFetching,
  } = useGetAllServicesQuery({ page: currentPage, limit, ...params });
  //   console.log(serviceData);

  const [removeService] = useRemoveServiceMutation();
  const token = useAppSelector(useCurrentToken);

  console.log(isLoading, isFetching);
  const metaData: TMetaData | undefined = serviceData?.meta;

  const tableData = serviceData?.data?.map(
    ({
      _id,
      name,
      description,
      price,
      duration,
      durationUnit,
      image,
      icon,
      isDeleted,
      createdAt,
      updatedAt,
    }) => ({
      key: _id,
      _id,
      name,
      description,
      price,
      duration,
      durationUnit,
      image,
      icon,
      isDeleted,
      createdAt,
      updatedAt,
    })
  );

  const handleEditService = (service: TServiceData) => {
    setSelectedService(service); // Set the service to edit
    setModalOpen(true); // Open the modal
  };

  const handleRemoveService = async (_id: string) => {
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
          await removeService({
            token,
            id: _id,
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The service has been removed from your Table.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove service:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove service from the Table.",
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
      title: "Name",
      key: "name",
      dataIndex: "name",
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
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (_, record) => `${record.duration} ${record.durationUnit || ""}`,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "x",
      render: (_, record) => {
        return (
          <div className="flex items-center  gap-5">
            <span
              onClick={() => handleEditService(record)}
              className="cursor-pointer"
            >
              <FaRegEdit className="text-2xl text-black" />
            </span>
            <span
              onClick={() => handleRemoveService(record.key as string)}
              className="cursor-pointer"
            >
              <RiDeleteBinLine className="text-2xl text-black" />
            </span>
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
    const activeFilters = filters.name || [];

    if (activeFilters.length === 0) {
      // Reset filters
      setParams({});
    } else {
      // Apply selected filter
      const selectedFilter = activeFilters[0];
      let sortQuery = "";

      if (selectedFilter === "price_high_to_low")
        sortQuery = "price_high_to_low";
      if (selectedFilter === "price_low_to_high")
        sortQuery = "price_low_to_high";

      setParams({ sort: sortQuery });
    }

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
      {isModalOpen && selectedService && (
        <AdminUpdateService
          open={isModalOpen}
          setOpen={setModalOpen}
          service={selectedService}
          id={selectedService._id}
        />
      )}
    </div>
  );
};

export default ManageServices;
