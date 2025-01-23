import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: {
    Id: null,
    Email: null,
    firstName: null,
    lastName: null,
  },
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userResponse, token, refreshToken } = action.payload;
      state.user = userResponse;
      state.token = token;
      state.refreshToken = refreshToken;

      localStorage.setItem("user", JSON.stringify(userResponse));
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      Cookies.set("token", token, { path: "/", sameSite: "Strict" });
    },
    logOut: (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      Cookies.remove("token", { path: "/", sameSite: "Strict" });

      return initialState;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
