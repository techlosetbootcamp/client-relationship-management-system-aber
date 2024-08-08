import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  data: {},
  loading: false,
};

type SignUpArgs = {
  payload: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};

type ForgetPasswordArgs = {
  payload: {
    email: string;
  };
};

type ResetPasswordArgs = {
  payload: {
    password: string;
    confirmPassword: string;
    userId: string;
  };
};

type ChangePasswordArgs = {
  payload: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    userId:string
  };
};



export const SignUp = createAsyncThunk<[], SignUpArgs>(
  "auth/signup",
  async (data) => {
    console.log("async signup data", data);
    const response = await axiosInstance.post("/auth/sign-up", data?.payload);
    console.log("signup response", response.data.status);
    return response.data;
  }
);

export const ForgetPassword = createAsyncThunk<[], ForgetPasswordArgs>(
  "auth/forgetPassword",
  async (data) => {
    console.log("async forgetPassword data", data);
    const response = await axiosInstance.post(
      "/auth/forget-password",
      data?.payload
    );
    console.log("forgetPassword response", response, response.status);
    return response.data;
  }
);

export const ResetPassword = createAsyncThunk<[], ResetPasswordArgs>(
  "auth/resetPassword",
  async (data) => {
    console.log("async ResetPassword data", data);
    const response = await axiosInstance.post(
      "/auth/reset-password",
      data?.payload
    );
    console.log("ResetPassword response", response);
    return response.data;
  }
);


export const ChangePassword = createAsyncThunk<[], ChangePasswordArgs>(
  "auth/changePassword",
  async (data) => {
    console.log("async changePassword data", data);
    const response = await axiosInstance.post(
      "/auth/change-password",
      data?.payload
    );
    console.log("changePassword response", response, response.status);
    return response.data;
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignUp.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SignUp.fulfilled, (state, action: PayloadAction<[]>) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ForgetPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      ForgetPassword.fulfilled,
      (state, action: PayloadAction<[]>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(ForgetPassword.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ResetPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      ResetPassword.fulfilled,
      (state, action: PayloadAction<[]>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.loading = false;
    });


    builder.addCase(ChangePassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      ChangePassword.fulfilled,
      (state, action: PayloadAction<[]>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(ChangePassword.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
