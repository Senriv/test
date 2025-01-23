import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";

const loadState = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (user && token && refreshToken) {
      return {
        auth: {
          user: JSON.parse(user),
          token: token,
          refreshToken: refreshToken,
        },
      };
    }
  } catch (e) {
    console.warn("Could not load state", e);
  }
  return undefined;
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
  preloadedState,
});
