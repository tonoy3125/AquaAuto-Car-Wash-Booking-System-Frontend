import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllServicesQuery } from "@/redux/features/services/serviceApi";
import { TServiceData } from "@/types";

type TDataType = {
  key: React.Key;
  name: string;
  description: string;
  price: number;
  duration: number;
  durationUnit: string;
  image: string;
  icon: string;
};
export type TTableData = Pick<
  TServiceData,
  "name" | "description" | "duration" | "durationUnit" | "image" | "icon"
>;

const ManageServices = () => {
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const {
    data: serviceData,
    isLoading,
    isFetching,
  } = useGetAllServicesQuery(params);
  //   console.log(serviceData);

  console.log(isLoading, isFetching);

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
    }) => ({
      key: _id,
      name,
      description,
      price,
      duration,
      durationUnit,
      image,
      icon,
    })
  );

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
      render: (text, record) =>
        `${record.duration} ${record.durationUnit || ""}`,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div className="flex items-center  gap-5">
            <button className="bg-[#43B9B2] px-6 py-2 font-poppins text-base rounded-lg text-white">
              Edit
            </button>
            <button className="bg-[#43B9B2] px-6 py-2 font-poppins text-base rounded-lg text-white">
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    _pagination,
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
          onChange={onChange}
          scroll={{ x: 768 }}
        />
      </div>
    </div>
  );
};

export default ManageServices;
