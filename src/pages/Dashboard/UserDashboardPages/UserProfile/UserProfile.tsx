import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { FiEdit } from "react-icons/fi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useState } from "react";
import UserUpdateProfile from "../../UserUpdateProfile/UserUpdateProfile";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [editableUser, setEditableUser] = useState(null); // User to edit
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  // console.log(user);
  const userId = user?.id;
  console.log(userId);
  const token = useAppSelector(useCurrentToken);
  const { data: singleUser } = useGetUserByIdQuery(
    userId ? { id: userId, token } : skipToken
  );
  console.log(singleUser);

  const handleEditClick = () => {
    setEditableUser(singleUser); // Set user data for the modal
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">User Profile</h1>
      <div className="flex flex-col items-center mt-10">
        <div className="relative">
          <img
            className="object-cover w-32 h-32 rounded-full ring ring-gray-300 dark:ring-gray-600"
            src="https://i.ibb.co.com/zRRyFjg/icons8-profile-picture-80.png"
            alt=""
          />
          <div
            className="absolute top-0 left-24 cursor-pointer"
            onClick={handleEditClick}
          >
            <FiEdit className="text-3xl" />
          </div>
        </div>
        <h1 className="font-poppins font-semibold mt-3 text-base">
          <span className="underline font-bold">Name </span> :{" "}
          {user?.user?.name}
        </h1>
        <h1 className="font-poppins font-semibold mt-1 text-base">
          <span className="underline font-bold">Email </span> :{" "}
          {user?.user?.email}
        </h1>
        <h1 className="font-poppins font-semibold mt-1 text-base">
          <span className="underline font-bold">Phone </span> : 0
          {user?.user?.phone}
        </h1>
      </div>
      {/* Update Profile Modal */}
      {isModalOpen && (
        <UserUpdateProfile
          user={editableUser}
          token={token}
          currentUser={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
