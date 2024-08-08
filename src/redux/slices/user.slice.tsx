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
    console.log("async editProfile data", data);
    const response = await axiosInstance.post(
      "/user/update-user",
      data?.payload
    );
    console.log("editProfile response", response, response.status);
    return response.data;
  }
);

///////////////////FINF THE PROBLEM MAN///////////////////

export const UpdateProfilePicture = createAsyncThunk<
  any,
  UpdateProfilePictureArgs
>("user/updateProfilePicture", async (data) => {
  console.log(
    "async UpdateProfilePicture data",
    data,
    typeof data,
    typeof data.payload
  );
  const response = await axiosInstance.post(
    "/user/update-profile-image",
    data.payload.formData
  );
  console.log("UpdateProfilePicture response", response, response.status);
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
