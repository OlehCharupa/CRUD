import { combineReducers } from "redux";
import errorRequest from "./errorRequest";
import loader from "./loader"
import token from "./token"
import userSlice from "./user"
import allUsers from "./allUsers"




export const rootReducer = combineReducers({
    error: errorRequest,
    loader,
    token,
    currentUser: userSlice,
    allUsers
})