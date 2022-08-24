import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { prependBaseUri } from "../baseUri";

export const getAllReservations = createAsyncThunk(
  "GET_ALL_RESERVATIONS",
  () => {
    return axios
      .get(prependBaseUri(`api/admin/reservations/all`))
      .then((res) => res.data);
  }
);

const AdminReservationReducer = createReducer([], {
  [getAllReservations.fulfilled]: (state, action) => action.payload,
});

export default AdminReservationReducer;
