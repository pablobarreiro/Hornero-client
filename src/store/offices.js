import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
require('dotenv').config({path:'../../.env'})

export const getOffices = createAsyncThunk("GET_OFFICES", () => {
  return axios.get(`${process.env.CORS_URL}/api/offices`).then((res) => res.data);
});

export const editOffice = createAsyncThunk("EDIT_OFFICES", (arr) => {
  console.log(arr);
  return axios.put(`${process.env.CORS_URL}/api/offices/${arr[1]}`, arr[0]).then((res) => res.data);
});

const OfficesReducer = createReducer([], {
    [getOffices.fulfilled]: (state, action) => action.payload,
  }
);

export default OfficesReducer;
