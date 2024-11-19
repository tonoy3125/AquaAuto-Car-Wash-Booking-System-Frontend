import { TServiceData } from "./serviceData.type";

export type TSlotData = {
  _id: string;
  service: TServiceData;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  createdAt: string;
  updatedAt: string;
};
