import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
require('dotenv').config({path:'../../.env'})

export const promoteUserToAdmin = createAsyncThunk('PROMOTE_USER_TO_ADMIN', (id) => {
    return axios.put(`${process.env.CORS_URL}/api/admin/users/${id}`, {admin: true})
    .then((res) => res.data)
})

export const removeUserToAdmin = createAsyncThunk('REMOVE_USER_TO_ADMIN', (id) => {
    return axios.put(`${process.env.CORS_URL}/api/admin/users/${id}`, {admin: false})
    .then((res) => res.data)
})


export const getAllUsers = createAsyncThunk('GET_ALL_USERS', () => {
    return axios.get(`${process.env.CORS_URL}/api/admin/users`)
    .then((res) => res.data)
})

export const deleteUser = createAsyncThunk('DELETE_USER', (userId) => {
    return axios.delete(`${process.env.CORS_URL}/api/admin/users/${userId}`)
    .then((res) => res.data)
})


const adminReducer = createReducer([], {
    [getAllUsers.fulfilled]: (state, action) => action.payload,
});


export default adminReducer;