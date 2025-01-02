import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TServiceData = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
};

type TComparisonState = {
  selectedServices: Record<string, TServiceData[]>; // Keyed by userId
};

const initialState: TComparisonState = {
  selectedServices: {}, // User-specific services
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addServiceToCompare: (
      state,
      action: PayloadAction<{ userId: string; service: TServiceData }>
    ) => {
      const { userId, service } = action.payload;
      if (!state.selectedServices[userId]) {
        state.selectedServices[userId] = [];
      }
      // Prevent duplicates
      if (!state.selectedServices[userId].find((s) => s._id === service._id)) {
        state.selectedServices[userId].push(service);
      }
    },
    removeServiceFromCompare: (
      state,
      action: PayloadAction<{ userId: string; serviceId: string }>
    ) => {
      const { userId, serviceId } = action.payload;
      if (state.selectedServices[userId]) {
        state.selectedServices[userId] = state.selectedServices[userId].filter(
          (s) => s._id !== serviceId
        );
      }
    },
    clearComparison: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.selectedServices[userId]) {
        state.selectedServices[userId] = [];
      }
    },
  },
});

export const {
  addServiceToCompare,
  removeServiceFromCompare,
  clearComparison,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
