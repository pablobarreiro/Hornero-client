import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getOffices = createAsyncThunk("GET_OFFICES", () => {
  return axios.get(`/api/offices`).then((res) => res.data);
});

export const editOffice = createAsyncThunk("EDIT_OFFICES", (arr) => {
  console.log(arr);
  return axios.put(`/api/offices/${arr[1]}`, arr[0]).then((res) => res.data);
});

const OfficesReducer = createReducer([], {
    [getOffices.fulfilled]: (state, action) => action.payload,
  }
);

export default OfficesReducer;
