import axios from "axios"
import { setErrorRequest } from "../slice/errorRequest"
import { loaderOn, loaderOff } from "../slice/loader";
import { addProfileState, deleteProfileState, editProfileState } from "../slice/user"

axios.defaults.baseURL = "http://localhost:5000"



export const addProfile = (profile) => async (dispatch) => {
    try {
        dispatch(loaderOn())
        const result = await axios.post("/profile", { ...profile })
        dispatch(addProfileState(result.data))

    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}

export const deleteProfile = (id) => async (dispatch) => {
    try {
        dispatch(loaderOn())
        await axios.delete(`/profile/${id}`)
        dispatch(deleteProfileState(id))
    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}

export const editProfile = (id, profile) => async (dispatch) => {
    try {
        dispatch(loaderOn())
        const result = await axios.patch(`/profile/${id}`, { ...profile })
        dispatch(editProfileState(result.data))
    } catch (error) {
        dispatch(setErrorRequest(error.message))
    } finally {
        dispatch(loaderOff())
    }
}