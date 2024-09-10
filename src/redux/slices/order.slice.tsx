import { axiosInstance } from "@/helpers/axiosInstance";
import { AddOrderArgs, GetOrderByDateArgs } from "@/types/Types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  data: [],
  loading: false,
};

export const GetOrders = createAsyncThunk<any>("order/getOrders", async () => {
  const response = await axiosInstance.get("/order/get-orders");

  return response.data.orderList;
});

export const AddOrder = createAsyncThunk<any, AddOrderArgs>(
  "user/addOrder",
  async (data) => {
    const response = await axiosInstance.post("/order/add-order", data.payload);
    data?.callback && data.callback(response);

    return response.data;
  }
);
export const GetOrderByDate = createAsyncThunk<any, GetOrderByDateArgs>(
  "user/getOrderByDate",
  async (data) => {
    const response = await axiosInstance.post(
      "/order/get-order-by-date",
      data?.payload
    );
    data?.callback && data.callback(response);

    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetOrders.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetOrders.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetOrderByDate.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetOrderByDate.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetOrderByDate.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
