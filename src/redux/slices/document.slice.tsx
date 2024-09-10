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

type DeleteDownloadDocumentArgs = {
  payload: {
    checkedItemsIds: string[];
  };
  callback: (data: any) => void;
};

export const AddDocument = createAsyncThunk<any, AddDocumentArgs>(
  "user/addDocument",
  async (data) => {
    const response = await axiosInstance.post(
      "/documents/add-document",
      data?.payload?.formData
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

export const GetDocument = createAsyncThunk<any>(
  "user/getDocuments",
  async (data) => {
    const response = await axiosInstance.get("/documents/get-documents");

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

    return response.data;
  }
);

export const DeleteDocument = createAsyncThunk<any, DeleteDownloadDocumentArgs>(
  "user/deleteDocuments",
  async (data) => {
    const response = await axiosInstance.post(
      "/documents/delete-documents",
      data.payload
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

export const DownloadDocument = createAsyncThunk<
  any,
  DeleteDownloadDocumentArgs
>("user/downloadDocuments", async (data) => {
  const response = await axiosInstance.post(
    "/documents/download-documents",
    data.payload
  );

  if (response.data.documents.length > 0) {
    response.data.documents.map(async (doc: any) => {
      if (doc && doc.type && doc.fileName && doc.fileURL) {
        const filePath = doc.fileName + "." + doc.type;
        const fetchURL = await fetch(doc.fileURL);
        if (!fetchURL.ok) throw new Error("Network response was not ok");

        const blob = await fetchURL.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = filePath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
      }
    });
  }
  data?.callback && data.callback(response);

  return response.data;
});

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
    builder.addCase(DeleteDocument.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DeleteDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(DeleteDocument.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DownloadDocument.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DownloadDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(DownloadDocument.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default documentSlice.reducer;
