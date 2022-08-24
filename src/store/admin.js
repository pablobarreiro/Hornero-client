import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { prependBaseUri } from "../baseUri";

export const promoteUserToAdmin = createAsyncThunk(
  "PROMOTE_USER_TO_ADMIN",
  (id) => {
    return axios
      .put(prependBaseUri(`api/admin/users/${id}`), { admin: true })
      .then((res) => res.data);
  }
);

export const removeUserToAdmin = createAsyncThunk(
  "REMOVE_USER_TO_ADMIN",
  (id) => {
    return axios
      .put(prependBaseUri(`api/admin/users/${id}`), { admin: false })
      .then((res) => res.data);
  }
);

export const getAllUsers = createAsyncThunk("GET_ALL_USERS", () => {
  return axios.get(prependBaseUri(`api/admin/users`)).then((res) => res.data);
});

export const deleteUser = createAsyncThunk("DELETE_USER", (userId) => {
  return axios
    .delete(prependBaseUri(`api/admin/users/${userId}`))
    .then((res) => res.data);
});

const adminReducer = createReducer([], {
  [getAllUsers.fulfilled]: (state, action) => action.payload,
});

export default adminReducer;
