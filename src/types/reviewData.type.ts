import { TUserData } from "./userData.type";

export type TReviewData = {
  _id: string;
  userId: TUserData;
  rating: number;
  review: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
