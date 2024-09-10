import { axiosInstance } from "@/helpers/axiosInstance";
import { documentsTableData } from "@/types/Types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

type AddProductArgs = {
  payload: {
    formData: object;
  };
  callback: (data: any) => void;
};

type DeleteProductArgs = {
  payload: {
    id: string;
  };
  callback: (data: any) => void;
};

export const AddProduct = createAsyncThunk<any, AddProductArgs>(
  "user/addProduct",
  async (data) => {
    const response = await axiosInstance.post(
      "/products/add-product",
      data?.payload?.formData
    );
    data?.callback && data.callback(response);

    return response?.data;
  }
);

export const GetProduct = createAsyncThunk<any>(
  "user/getProducts",
  async (data) => {
    const response = await axiosInstance.get("/products/get-products");

    return response?.data?.product;
  }
);

export const DeleteProduct = createAsyncThunk<any, DeleteProductArgs>(
  "user/deleteProducts",
  async (data) => {
    const response = await axiosInstance.post(
      "/products/delete-product",
      data.payload
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddProduct.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      AddProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(AddProduct.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetProduct.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(GetProduct.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DeleteProduct.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      DeleteProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.data = action.payload);
      }
    );
    builder.addCase(DeleteProduct.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
