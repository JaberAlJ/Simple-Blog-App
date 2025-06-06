import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import blogReducer from "../Features/BlogSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { reset as resetUsers } from "../Features/UserSlice";
import { reset as resetBlogs } from "../Features/BlogSlice";

const persistConfig = {
    key: "reduxStore",
    storage,
};

const rootReducer = combineReducers({
    users: usersReducer,
    blogs: blogReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/PURGE",
                ],
            },
        }),
});
const storePersist = persistStore(store);

const resetStore = () => {
    store.dispatch(resetUsers());
    store.dispatch(resetBlogs());
};

export { store, storePersist, resetStore };
