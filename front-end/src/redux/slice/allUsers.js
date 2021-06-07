import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const allUsers = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
        setUsersState(state, { payload }) {
            return [...state, ...payload]
        },
        resetUsersState(state, { payload }) {
            return initialState
        },
        editUserState(state, { payload }) {
            return [
                ...state.map(user => user._id !== payload._id ? user : { ...payload })
            ]
        },
        deleteUserState(state, { payload }) {
            return [
                ...state.filter(user => user._id !== payload)
            ]
        }
    }
})

const { actions, reducer } = allUsers
export const { setUsersState, resetUsersState, editUserState, deleteUserState } = actions
export default reducer