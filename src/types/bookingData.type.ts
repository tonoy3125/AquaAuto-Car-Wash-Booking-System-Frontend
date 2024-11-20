import { TSlotData } from "./slotData.type";
import { TUserData } from "./userData.type";
import { TServiceData } from "@/types";

export type TBookingData = {
  _id: string;
  customer: TUserData;
  service: TServiceData;
  slot: TSlotData;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt: string;
  updatedAt: string;
};
