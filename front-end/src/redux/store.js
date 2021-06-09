import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { rootReducer } from "./slice/rootReducer"

const persistConfig = {
    key: "token",
    version: 1,
    storage,
    whitelist: ['token']
}

const persReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }),
    devTools: process.env.NODE_ENV !== "production"
})
export const persistor = persistStore(store)