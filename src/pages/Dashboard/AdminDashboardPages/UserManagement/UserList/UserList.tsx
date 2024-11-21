import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetAllUsersQuery,
  useRemoveUserMutation,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TMetaData } from "@/types";
import { TUserData } from "@/types/userData.type";
import { Input, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

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
  const [removeUser] = useRemoveUserMutation();
  const token = useAppSelector(useCurrentToken);
  const limit = 10;
  const { data: userData, isFetching } = useGetAllUsersQuery({
    page: currentPage,
    limit,
    ...params,
  });
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

  const handleRemoveUser = async (_id: string) => {
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
          await removeUser({
            token,
            id: _id,
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The User has been removed from your Table.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove User:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove User from the Table.",
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
            onClick={() => handleRemoveUser(record.key as string)}
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

      <div className="mb-5 flex items-center justify-end gap-4">
        <Input
          placeholder="Search User By Name & Email..."
          allowClear
          style={{ width: "25%" }}
          onChange={handleSearchChange}
        />
      </div>

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
