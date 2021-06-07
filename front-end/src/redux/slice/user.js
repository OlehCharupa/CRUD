import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    role: "",
    profiles: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, { payload }) {
            return { ...state, ...payload }
        },
        resetUser(state, { payload }) {
            return initialState
        },
        addProfileState(state, { payload }) {
            return {
                ...state,
                profiles: [...state.profiles, payload]
            }
        },
        deleteProfileState(state, { payload }) {
            return {
                ...state,
                profiles: [...state.profiles.filter(
                    (profile) => profile._id !== payload
                )]
            }
        },
        editProfileState(state, { payload }) {
            return {
                ...state,
                profiles: [...state.profiles.map(
                    (profile) => profile._id !== payload._id ? profile : { ...payload }
                )]
            }
        }
    }
})

const { actions, reducer } = userSlice;
export const { setUser, resetUser, addProfileState, deleteProfileState, editProfileState } = actions;

export default reducer