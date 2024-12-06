


import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import sampleReducer from "./sample.reducers";
import tripReducer from "./Trip.reducers";
import transactionReducer from "./Transaction.reducer";
import postReducer from "./postReducer";
import plandataReducers from "./plandata.reducers";
import addTripReducers from "./addTrip.reducers";
import editTripReducers from "./editTrip.reducers";
import addExpenseReducer from "./expenseAdded.reducer";
import liveUpdateReducer from "./liveUpdate.reducer";
import planupdateReducer from "./planupdate.reducer";

const store = configureStore({
  reducer: {
    sample: sampleReducer,
    tripDetails: tripReducer,
    transaction: transactionReducer,
    post: postReducer,
    plans: plandataReducers,
    liveUpdate: liveUpdateReducer,
    addTrip: addTripReducers,
    addExpense: addExpenseReducer,
    updatePlan: planupdateReducer,
    editTrip: editTripReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
