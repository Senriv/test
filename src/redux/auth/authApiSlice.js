import { apiSlice } from "../../redux/api/apiSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "user/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          apiSlice.util.resetApiState();
        } catch {
          console.error("Logout failed");
        }
      },
    }),

    resendVerifyCode: builder.mutation({
      query: (credentials) => ({
        url: "user/sendCode",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    verifyCode: builder.mutation({
      query: (credentials) => ({
        url: "user/verify",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendVerifyCodeMutation,
  useVerifyCodeMutation,
} = authApiSlice;
