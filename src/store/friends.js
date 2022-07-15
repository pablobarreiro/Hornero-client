import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
require('dotenv').config({path:'../.env'})

export const getFriends = createAsyncThunk("GET_FRIENDS", () => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.get(`${process.env.CORS_URL}/api/friends/${userId}`)
        .then(res => res.data)
})

export const addFriend = createAsyncThunk("ADD_FRIEND", (userIdToAdd) => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.post(`${process.env.CORS_URL}/api/friends/add/${userId}/${userIdToAdd}`)
})

export const removeFriend = createAsyncThunk("REMOVE_FRIEND", (userIdToDelete) => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.delete(`${process.env.CORS_URL}/api/friends/remove/${userId}/${userIdToDelete}`)
})

export const sendMailToFriend = createAsyncThunk("SEND_MAIL_TO_FRIEND", (mailData) => {
    // mailData = {mailFrom:'Nombre Apellido', mailTo: 'destinatario@globant.com', mailBody:'cuerpo del mail'}
    return axios.post(`${process.env.CORS_URL}/api/friends/sendMail`, mailData)
})

export const searchFriends = createAsyncThunk("SEARCH_FRIENDS", (searchInput) => {
    return axios.get(`${process.env.CORS_URL}/api/friends/search/${searchInput}`)
        .then(user => user.data)
}) 


const friendsReducer = createReducer([], {
    [getFriends.fulfilled]: (state, action) => action.payload,
});

export default friendsReducer;