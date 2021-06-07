import axios from "axios";
import { resetUsersState } from "../slice/allUsers";
import { setErrorRequest, resetErrorRequest } from "../slice/errorRequest";
import { loaderOn, loaderOff } from "../slice/loader";
import { resetToken, setToken } from "../slice/token";
import { resetUser, setUser } from "../slice/user";

axios.defaults.baseURL = "http://localhost:5000"

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = "";
    },
};

export const registrationOperations = (obj) => async (dispath) => {
    try {
        dispath(resetErrorRequest());
        dispath(loaderOn())
        await axios.post("/auth/register", { ...obj })
    } catch (error) {
        dispath(setErrorRequest(error.message))
    }
    finally {
        dispath(loaderOff())
    }
}

export const loginOperations = (obj) => async (dispath) => {
    try {
        dispath(resetErrorRequest());
        dispath(loaderOn())
        const result = await axios.post("/auth/login", { ...obj });
        token.set(result.data.accessToken)
        dispath(setToken(result.data.accessToken))
        dispath(setUser(result.data.data))
    } catch (error) {
        dispath(setErrorRequest(error.message))
    } finally {
        dispath(loaderOff())
    }
}

export const logOut = () => async (dispatch) => {
    try {
        dispatch(resetErrorRequest())
        dispatch(loaderOn())
        await axios.post("/auth/logout")
        token.unset()
        dispatch(resetUser())
        dispatch(resetToken())
        dispatch(resetUsersState())
    } catch (error) {
        dispatch(setErrorRequest())
    } finally {
        dispatch(loaderOff())
    }
}
