import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getReservations = createAsyncThunk("GET_RESERVATIONS", (id) => {
  return axios.get(`/api/reservations/office/${id}`).then((res) => res.data);
});

export const newReservation = createAsyncThunk("NEW_RESERVATION", (reserv) => {
  return axios.post(`/api/reservations`, reserv);
});

export const cancelReservation = createAsyncThunk(
  "CANCEL_RESERVATION",
  (reserveId) => {
    return axios.delete(`/api/reservations/${reserveId}`);
  }
);

export const getAllFutureReservations = createAsyncThunk(
  "GET_RESERVATIONS",
  (id) => {
    return axios
      .get(`/api/reservations/office/${id}/date`)
      .then((res) => res.data);
  }
);

export const getAllPastReservations = createAsyncThunk(
  "GET_RESERVATIONS",
  (id) => {
    return axios
      .get(`/api/reservations/office/date/${id}`)
      .then((res) => res.data);
  }
);

const ReservationReducer = createReducer(null, {
  [getReservations.fulfilled]: (state, action) => action.payload,
  [getAllFutureReservations.fulfilled]: (state, action) => action.payload,
  [getAllPastReservations.fulfilled]: (state, action) => action.payload,
});

export default ReservationReducer;
