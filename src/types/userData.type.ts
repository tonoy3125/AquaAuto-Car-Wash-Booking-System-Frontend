import { TUserPayload } from "./global";

export type TUserData = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  address: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TUserResponse = {
  data: TUserData;
};

export type TCurrentUser = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  token: string;
};

export type TUserUpdateProfileProps = {
  user: TUserResponse | null;
  onClose: () => void;
  token: string | null;
  currentUser: TUserPayload | null;
};
