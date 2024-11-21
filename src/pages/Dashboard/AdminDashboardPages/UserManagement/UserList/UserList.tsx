import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TMetaData } from "@/types";
import { TUserData } from "@/types/userData.type";
import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

type TDataType = {
  key: React.Key;
  _id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
export type TTableData = Pick<
  TUserData,
  "name" | "email" | "phone" | "address" | "role"
>;

const UserList = () => {
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const {
    data: userData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({ page: currentPage, limit, ...params });
  //   console.log(userData);
  const metaData: TMetaData | undefined = userData?.meta;

  const tableData = userData?.data?.map(
    ({ _id, name, email, phone, address, role, createdAt, updatedAt }) => ({
      key: _id,
      _id,
      name,
      email,
      phone,
      address,
      role,
      createdAt,
      updatedAt,
    })
  );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      
    },

    {
      title: "Action",
      key: "x",
      render: (_, record) => {
        return (
          <div
            // onClick={() => handleRemoveSlot(record.key as string)}
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
      <h1 className="font-poppins font-bold text-2xl mb-5">User Management</h1>
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

export default UserList;
