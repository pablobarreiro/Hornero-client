import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { prependBaseUri } from "../baseUri";

export const getFavorites = createAsyncThunk("GET_FAVORITES", () => {
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  return axios
    .get(prependBaseUri(`api/favorites/${userId}`))
    .then((res) => res.data);
});

export const addFavorite = createAsyncThunk("ADD_FAVORITE", (desk) => {
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  return axios.post(prependBaseUri(`api/favorites/${userId}/add/${desk}`));
});

export const removeFavorite = createAsyncThunk("REMOVE_FAVORITE", (desk) => {
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  return axios.delete(prependBaseUri(`api/favorites/${userId}/remove/${desk}`));
});

const favoritesReducer = createReducer([], {
  [getFavorites.fulfilled]: (state, action) => action.payload,
});

export default favoritesReducer;
