import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken(state, { payload }) {
            return payload
        },
        resetToken() {
            return initialState
        }
    }
})

const { actions, reducer } = tokenSlice

export const { setToken, resetToken } = actions

export default reducer