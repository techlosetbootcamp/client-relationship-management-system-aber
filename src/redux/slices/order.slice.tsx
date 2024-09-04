import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type orde = {

    orderId: string,
    customerId:string,
    customer: string,
    email:string,
    contact:string,
    address: string,
    orders: string,
    totalQuantity: string,
    subTotal:string,
}


const initialState = {
  data: [] ,
  loading: false,
};

export const GetOrders = createAsyncThunk<any>("order/getOrders", async () => {
  const response = await axiosInstance.get("/order/get-orders");
  console.log(response);  

  return response.data.orderList;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetOrders.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetOrders.fulfilled, (state, action) => {
        console.log("action payload", action.payload)
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetOrders.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
