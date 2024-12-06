

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    tripId: 1,
    tripName: "Peggy's Cove",
    tripDescription:
      "Aliquam quis sed dapibus augue gravida. Integer bibendum tempor nisi, vitae luctus tortor tincidunt porttitor. Nullam purus massa, lobortis eu lacus commodo,",
    tripDate: "08:11 - 04 Feb 2022",
    initialBudget: 500,
    totalExpense: 900,
  },
  {
    tripId: 2,
    tripName: "Shore Club",
    tripDescription:
      "Aliquam quis sed dapibus augue gravida. Integer bibendum tempor nisi, vitae luctus tortor tincidunt porttitor. Nullam purus massa, lobortis eu lacus commodo, condimentum ultrices tellus.",
    tripDate: "07:19 - 15 Mar 2021",
    initialBudget: 700,
    totalExpense: 650,
  },
  {
    tripId: 3,
    tripName: "McNabs Island",
    tripDescription:
      "Suspendisse dapibus nisi fermentum tincidunt varius. Nulla dictum bibendum pretium. Nulla placerat sem porttitor dui lobortis aliquet nec at massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "12:50 - 06 Sup 2020",
    initialBudget: 800,
    totalExpense: 650,
  },
  {
    tripId: 4,
    tripName: "Shubenacadie Wildlife Park",
    tripDescription:
      "Fermentum aliquet nec at massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "09:60 - 06 Dec 2021",
    initialBudget: 800,
    totalExpense: 780,
  },
  {
    tripId: 5,
    tripName: "Rainbow Haven Beach",
    tripDescription:
      "Nulla placerat sem porttitor dui lobortis aliquet nec at massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "09:15 - 06 Jan 2021",
    initialBudget: 800,
    totalExpense: 650,
  },
  {
    tripId: 6,
    tripName: "Harbour Hopper",
    tripDescription:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "08:50 - 07 Aug 2004",
    initialBudget: 800,
    totalExpense: 505,
  },
  {
    tripId: 7,
    tripName: "Lawrencetown Beach",
    tripDescription:
      "Suspendisse dapibus nisi fermentum tincidunt varius. Nulla dictum bibendum pretium. Nulla placerat sem porttitor dui lobortis aliquet nec at massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "07:40 - 05 Feb 2002",
    initialBudget: 800,
    totalExpense: 800,
  },
  {
    tripId: 8,
    tripName: "BLT Trail",
    tripDescription:
      "Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "06:12 - 08 Mar 2020",
    initialBudget: 800,
    totalExpense: 764,
  },
  {
    tripId: 9,
    tripName: "Sir Sanford Fleming Park",
    tripDescription:
      "A dictum bibendum pretium. Nulla placerat sem porttitor Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "5:90 - 04 Apr 2022",
    initialBudget: 800,
    totalExpense: 354,
  },
  {
    tripId: 10,
    tripName: "Neptune Theatre",
    tripDescription:
      "Nulla placerat sem porttitor Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.Maecenas et ipsum ante. Sed eleifend diam elit, sed faucibus nibh imperdiet ac.",
    tripDate: "02:25 - 01 Nov 2000",
    initialBudget: 800,
    totalExpense: 450,
  },
];

const tripDetailsSlice = createSlice({
  name: "tripDetails",
  initialState: initialState,
  reducers: {
    addTrip: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTrip } = tripDetailsSlice.actions;
export default tripDetailsSlice.reducer;
