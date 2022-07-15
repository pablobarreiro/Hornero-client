import { createAction, createReducer } from '@reduxjs/toolkit'

export const setDarkMode = createAction("setDarkMode");

const initialState = JSON.parse(localStorage.getItem('darkMode')) || false
const darkModeReducer = createReducer(initialState, {
    [setDarkMode]: (state, action) => state = action.payload
    
});

export default darkModeReducer;