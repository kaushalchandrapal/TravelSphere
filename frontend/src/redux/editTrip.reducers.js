

import { createSlice } from "@reduxjs/toolkit";

const editTripSlice = createSlice({
  name: "editTrip",
  initialState: { tripEdited: "" },
  reducers: {
    tripEdited: (state, action) => {
      state.tripEdited = action.payload;
    },
  },
});

export const { tripEdited } = editTripSlice.actions;
export default editTripSlice.reducer;
