import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/users/userSlice.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import { cocktailsReducer } from '../features/cocktails/cocktailsSlice.ts';


const userPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, userReducer),
  cocktails: cocktailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
