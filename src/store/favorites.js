import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
require('dotenv').config({path:'../.env'})

export const getFavorites = createAsyncThunk("GET_FAVORITES", () => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.get(`${process.env.CORS_URL}/api/favorites/${userId}`)
        .then(res => res.data)
})

export const addFavorite = createAsyncThunk("ADD_FAVORITE", (desk) => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.post(`${process.env.CORS_URL}/api/favorites/${userId}/add/${desk}`)
})

export const removeFavorite = createAsyncThunk("REMOVE_FAVORITE", (desk) => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.delete(`${process.env.CORS_URL}/api/favorites/${userId}/remove/${desk}`)
})

const favoritesReducer = createReducer([], {
    [getFavorites.fulfilled]: (state, action) => action.payload,
});

export default favoritesReducer;