import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../global/global";
import api from '../api/api';


const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware);
    },
    devTools: true,
});

export default store;