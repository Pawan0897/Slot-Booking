import React from 'react'
import { createSlice } from "@reduxjs/toolkit"

const createslice = createSlice({
    name: "user",
    initialState: {
        token: "",
        isActive: "",
        status: "",
        detail: ""

    },
    reducers: {
        AddToken: (state, action) => {
            state.token = action.payload
        },

        AddDetail: (state, action) => {
            state.isActive = action.payload;
        },
        AddStatus: (state, action) => {
            state.status = action.payload
        },
        AddUser: (state, action) => {
            state.detail = action.payload;
        }
    }
})

export const { AddToken, AddDetail, AddStatus, AddUser } = createslice.actions;
export default createslice.reducer
