import { axiosInstance } from "@/helpers/axiosInstance";
import { documentsTableData } from "@/types/Types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [] as documentsTableData[],
  loading: false,
};

type AddDocumentArgs = {
  payload: {
    formData: object;
  };
  callback: (data: any) => void;
};
type EditDocumentArgs = {
  payload: {
    version: string;
    status: string;
    id: string;
  };
  callback: (data: any) => void;
};

export const AddDocument = createAsyncThunk<any, AddDocumentArgs>(
  "user/addDocument",
  async (data) => {
    console.log("async addDocument data", data);

    const response = await axiosInstance.post(
      "/documents/add-document",
      data?.payload?.formData
    );
    data?.callback && data.callback(response);
    console.log("add-document response", response, response.status);
    return response.data;
  }
);

export const GetDocument = createAsyncThunk<any>(
  "user/getDocuments",
  async (data) => {
    const response = await axiosInstance.get("/documents/get-documents");
    console.log(response);

    return response.data.document;
  }
);

export const EditDocument = createAsyncThunk<any, EditDocumentArgs>(
  "user/editDocuments",
  async (data) => {
    const response = await axiosInstance.post(
      "/documents/edit-document",
      data?.payload
    );
    data?.callback && data.callback(response);
    console.log("edit-document response", response, response.status);
    return response.data;
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddDocument.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      AddDocument.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(AddDocument.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetDocument.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetDocument.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(EditDocument.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(EditDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(EditDocument.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default documentSlice.reducer;
