

import { createSlice } from "@reduxjs/toolkit";

const addTripSlice = createSlice({
  name: "addTrip",
  initialState: { tripAdded: "" },
  reducers: {
    tripAdded: (state, action) => {
      state.tripAdded = action.payload;
    },
  },
});

export const { tripAdded } = addTripSlice.actions;
export default addTripSlice.reducer;
