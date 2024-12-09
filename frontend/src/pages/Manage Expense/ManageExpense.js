

import React, { useState, useEffect, useRef } from "react";
import "../Manage Expense/ManageExpenses.styles.css";
import Transaction from "../../layouts/TransactionDetails/Transaction";
import TripCard from "../../layouts/TripCardME/TripCardME";
import TripExpenseDetails from "../../layouts/TripExpenseDetails/TripExpenseDetails";
import { Button, IconComponent, Popup } from "../../components";
import AddExpensePopUp from "../../components/AddExpensePopUp/AddExpensePopUp";
import { useDispatch, useSelector } from "react-redux";
import { selectedTripCard } from "../../redux/sample.reducers";
import axios from "../../utils/axios";
import { expenseAdded } from "../../redux/expenseAdded.reducer";
import { tripAdded } from "../../redux/addTrip.reducers";
import EditTripPopUp from "../../components/PopUp/EditTripPopUp";
import { toast } from "react-toastify";

const ManageExpense = (props) => {
  const expenseAddedState = useSelector(
    (store) => store.addExpense.expenseAdded
  );
  const tripAddedState = useSelector((store) => store.addTrip.tripAdded);
  const tripEditedState = useSelector((store) => store.editTrip.tripEdited);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [popupVisibleForAddExpense, setPopupVisibleForAddExpense] =
    useState(false);

  const myRef = useRef(null);
  const [ref, setRef] = useState(false);

  const [tripInformation, setTripInformation] = useState([]);
  const [transactionInformation, setTransactionInformation] = useState([]);
  const [selectedInformation, setSelectedInformation] = useState();
  console.log("selectedInformation :>> ", selectedInformation);

  const dispatch = useDispatch();

  const handleTripClick = (idSelected) => {
    console.log("idSelected :>> ", idSelected);
    setSelectedTripId(idSelected);
    setRef(true);
    dispatch(selectedTripCard(idSelected));
    try {
      axios.get(`/trip/get/${selectedTripId}`).then((response) => {
        setSelectedInformation(response.data.trip);
      });
    } catch (err) {
      toast.error("Something went wrong!! Try again!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    try {
      
      {selectedTripId && axios.get(`/trip/get/${selectedTripId}`).then((response) => {
        setSelectedInformation(response.data.trip);
      });}
    } catch (err) {
      toast.error("Something went wrong!! Try again!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [selectedTripId]);

  useEffect(() => {
    if (ref === true) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
      setRef(false);
    }
  }, [ref]);

  useEffect(() => {
    props.setProgress(10);
    try {
      axios.get("/trip").then((response) => {
        setTripInformation(response.data.trips.reverse());
        setSelectedTripId(response.data.trips[0]?._id || "");
        dispatch(selectedTripCard(response.data.trips[0]?._id || ""));
        props.setProgress(100);
      });
    } catch (err) {
      console.log(err);
    }
  }, [tripAddedState, dispatch]);
  useEffect(() => {
    props.setProgress(10);
    try {
      axios.get("/trip").then((response) => {
        setTripInformation(response.data.trips.reverse());
        setSelectedTripId(
          tripEditedState ? tripEditedState : response.data.trips[0]?._id || ""
        );
        dispatch(
          selectedTripCard(
            tripEditedState
              ? tripEditedState
              : response.data.trips[0]?._id || ""
          )
        );
        props.setProgress(100);
      });
    } catch (err) {
      console.log(err);
    }
  }, [tripEditedState, expenseAddedState]);
  useEffect(() => {
    try {
      props.setProgress(10);
     {selectedTripId &&  axios.get(`/expense/${selectedTripId}`).then((response) => {
        setTransactionInformation(response.data.expense);
        dispatch(expenseAdded(""));
        props.setProgress(100);
      });}
    } catch (err) {
      console.log(err);
    }
  }, [selectedTripId, dispatch, expenseAddedState]);
  const handlePopup = () => {
    setPopupVisible(true);
  };
  const handleExpensePopUp = () => {
    setPopupVisibleForAddExpense(true);
  };

  const handleTripEdit = () => {
    setEditPopupVisible(true);
  };

  const handleTripDelete = () => {
    dispatch(tripAdded(`${selectedTripId}`));
    let message = "Confirm Delete?";
    if (window.confirm(message) === true) {
      props.setProgress(10);
      axios.delete(`/trip/delete/${selectedTripId}`).then((response) => {
        try {
          if (response.data.success) {
            setSelectedTripId(tripInformation[0]._id);
            dispatch(tripAdded(""));
            toast.success("Trip Deleted successfully!!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            props.setProgress(100);
          } else {
            toast.error("Something went wrong!! Try again!!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (err) {
          toast.error("Something went wrong!! Try again!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };

  return (
    <>
      <div
        className={`${
          popupVisible || editPopupVisible || popupVisibleForAddExpense
            ? "non_scrollable_expense_main_container"
            : "expense-main-container"
        }`}
      >
        <div className="expense-left-container-trip-list">
          <div className="expense-left-container__title-bar">
            <span className="expense-left-container-title-bar__title">
              Manage Expenses
            </span>
            <Button variant="blue" name="+ New Trip" onClick={handlePopup} />
            <Popup trigger={popupVisible} setTrigger={setPopupVisible}></Popup>
          </div>
          <div className="expense-left-container__trip-list">
            {tripInformation.map((trip) => (
              <div onClick={() => handleTripClick(trip._id)}>
                <TripCard
                  props={{
                    title: `${trip.tripName}`,
                    date: `${trip.tripDate}`,
                    tripDescription: `${trip.tripDescription}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div ref={myRef} className="expense-right-container">
          <div>
            <div>
              <div className="expense-right-container__title-bar">
                <div className="expense-right-container-title-bar__title">
                  <span>
                    {
                      tripInformation.find(
                        (trip) => trip._id === selectedTripId
                      )?.tripName
                    }
                  </span>
                </div>
                <div className="expesnse-right-container-title-bar__date">
                  <IconComponent
                    name="edit"
                    className="trip-details-icon__edit"
                    onClick={handleTripEdit}
                  />
                  {editPopupVisible ? (
                    <EditTripPopUp
                      selectedTripCard={selectedInformation}
                      trigger={editPopupVisible}
                      setTrigger={setEditPopupVisible}
                    />
                  ) : (
                    ""
                  )}
                  <IconComponent
                    name="delete"
                    className="trip-details-icon__delete"
                    onClick={handleTripDelete}
                  />
                  <span>
                    {
                      tripInformation.find(
                        (trip) => trip._id === selectedTripId
                      )?.tripDate
                    }
                  </span>
                </div>
              </div>
              <div className="expense-right-container__description">
                <TripExpenseDetails
                  props={{
                    detailedDescription: `${
                      tripInformation.find(
                        (trip) => trip._id === selectedTripId
                      )?.tripDescription
                    }`,
                    initialBudget: `$ ${
                      tripInformation.find(
                        (trip) => trip._id === selectedTripId
                      )?.initialBudget
                    }`,
                    totalExpense: `$ ${
                      tripInformation.find(
                        (trip) => trip._id === selectedTripId
                      )?.totalExpense
                    }`,
                  }}
                />
              </div>
              <div className="expense-transaction-title-bar">
                <div className="expense-transaction-title">
                  <span>Transactions</span>
                </div>
                <div className="expense-transaction-button">
                  <Button
                    variant="transparent"
                    name="+ Add Expense"
                    onClick={handleExpensePopUp}
                  />
                  <AddExpensePopUp
                    selectedTripCard={selectedTripId}
                    trigger={popupVisibleForAddExpense}
                    setTrigger={setPopupVisibleForAddExpense}
                  ></AddExpensePopUp>
                </div>
              </div>
              <div className="expense-right-container__transaction">
                {transactionInformation.map((transaction) => {
                  return transaction.tripId === selectedTripId ? (
                    <Transaction
                      props={{
                        transactionName: `${transaction.transactionName}`,
                        transactionId: `${transaction._id}`,
                        transactionAmount: `$ ${transaction.transactionAmount}`,
                      }}
                    />
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageExpense;
