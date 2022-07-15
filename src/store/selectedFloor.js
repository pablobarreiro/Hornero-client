import { createAction, createReducer } from '@reduxjs/toolkit'

export const selectedFloor = createAction("selectedFloor");

const initialState = ""
const selectedFloorReducer = createReducer(initialState, {
    [selectedFloor]: (state, action) => state = action.payload
    
});

export default selectedFloorReducer;