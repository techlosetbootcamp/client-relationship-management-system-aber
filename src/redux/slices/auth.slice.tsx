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
  callback: (data: any) => void;
};

type ForgetPasswordArgs = {
  payload: {
    email: string;
  };
  callback: (data: any) => void;
};

type ResetPasswordArgs = {
  payload: {
    password: string;
    confirmPassword: string;
    userId: string;
  };
  callback: (data: any) => void;
};

type ChangePasswordArgs = {
  payload: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    userId: string;
  };
};

export const SignUp = createAsyncThunk<[], SignUpArgs>(
  "auth/signup",
  async (data) => {
    const response = await axiosInstance.post("/auth/sign-up", data?.payload);
    data?.callback && data.callback(response);

    return response.data;
  }
);

export const ForgetPassword = createAsyncThunk<[], ForgetPasswordArgs>(
  "auth/forgetPassword",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/forget-password",
      data?.payload
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

export const ResetPassword = createAsyncThunk<[], ResetPasswordArgs>(
  "auth/resetPassword",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      data?.payload
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

export const ChangePassword = createAsyncThunk<[], ChangePasswordArgs>(
  "auth/changePassword",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/change-password",
      data?.payload
    );

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
