import axios from "axios";
import { loaderOn, loaderOff } from "../slice/loader.js";
import { setErrorRequest, resetErrorRequest } from "../slice/errorRequest.js";
import { setUser } from "../slice/user.js";
import { setUsersState, editUserState, deleteUserState } from "../slice/allUsers.js"

axios.defaults.baseURL = "http://localhost:5000"

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = "";
    },
};

export const currentUser = (userToken) => async (dispatch) => {
    try {
        dispatch(loaderOn())
        dispatch(resetErrorRequest())
        const result = await axios.get('/user/currentUser', token.set(userToken))
        dispatch(setUser(result.data))
    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}

export const allUsers = () => async (dispatch) => {
    try {
        dispatch(loaderOn())
        dispatch(resetErrorRequest())
        const result = await axios.get('/user/allUsers')
        dispatch(setUsersState(result.data))
    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}

export const editUserOperation = (id, user) => async (dispatch) => {
    try {
        dispatch(loaderOn())
        dispatch(resetErrorRequest())
        const result = await axios.patch(`/user/${id}`, user)
        dispatch(editUserState(result.data))
    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(loaderOn())
        dispatch(resetErrorRequest())
        await axios.delete(`/user/${id}`)
        dispatch(deleteUserState(id))
        // dispatch(resetUsersState())
    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}