import { axiosInstance } from "@/helpers/axiosInstance";
import { GetUserByDateArgs } from "@/types/Types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  loading: false,
};

type EditProfileArgs = {
  payload: {
    id: string;
    currentEmail: string;
    newEmail: string;
    name: string;
  };
  callback: (data: any) => void;
};

type UpdateProfilePictureArgs = {
  payload: {
    formData: object;
  };
  callback: (data: any) => void;
};

export const EditProfile = createAsyncThunk<[], EditProfileArgs>(
  "user/editProfile",
  async (data) => {
    const response = await axiosInstance.post(
      "/user/update-user",
      data?.payload
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

export const UpdateProfilePicture = createAsyncThunk<
  any,
  UpdateProfilePictureArgs
>("user/updateProfilePicture", async (data) => {
  const response = await axiosInstance.post(
    "/user/update-profile-image",
    data.payload.formData
  );
  data?.callback && data.callback(response);

  return response.data;
});


export const GetUserByDate = createAsyncThunk<any, GetUserByDateArgs>(
  "user/getOrderByDate",
  async (data) => {
    const response = await axiosInstance.post(
      "/user/get-user-by-date",
      data?.payload
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EditProfile.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      EditProfile.fulfilled,
      (state, action: PayloadAction<[]>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(EditProfile.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateProfilePicture.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      UpdateProfilePicture.fulfilled,
      (state, action: PayloadAction<[]>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(UpdateProfilePicture.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetUserByDate.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetUserByDate.fulfilled,
      (state, action: PayloadAction<[]>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(GetUserByDate.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
