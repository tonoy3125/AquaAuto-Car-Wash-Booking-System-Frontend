import { BaseQueryApi } from "@reduxjs/toolkit/query";
export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TMetaData = {
  page: number;
  total: number;
  totalPage: number;
};

// Define an interface for the user
export type TUser = {
  email: string;
  name: string;
  role: string;
  phone: number;
  iat: number; // Issued at time (Unix timestamp)
  exp: number; // Expiration time (Unix timestamp)
};

// Define an interface for the payload
export type TUserPayload = {
  user: TUser;
  id: string;
};

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

export type TSlot = {
  date: string; // Adjust type based on the actual format of `date`
  [key: string]: any; // Include other properties of the slot if necessary
};
