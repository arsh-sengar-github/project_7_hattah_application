import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";
import localStorage from "redux-persist/es/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  authStore: authReducer,
  cartStore: cartReducer,
});
const persistConfig = {
  key: "root",
  storage: localStorage,
};
const currentPersistReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: currentPersistReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
