import { axiosInstance } from "@/helpers/axiosInstance";
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
};

type UpdateProfilePictureArgs = {
  payload: {
    formData: object;
  };
};

export const EditProfile = createAsyncThunk<[], EditProfileArgs>(
  "user/editProfile",
  async (data) => {
    const response = await axiosInstance.post(
      "/user/update-user",
      data?.payload
    );

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

  return response.data;
});

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
  },
});

export default userSlice.reducer;
