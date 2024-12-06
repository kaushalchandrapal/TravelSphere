

import { createSlice } from "@reduxjs/toolkit";

const sampleSlice = createSlice({
  name: "sample",
  initialState: { tripIdSelected: "" },
  reducers: {
    selectedTripCard: (state, action) => {
      state.tripIdSelected = action.payload;
    },
  },
});

export const { selectedTripCard } = sampleSlice.actions;
export default sampleSlice.reducer;
