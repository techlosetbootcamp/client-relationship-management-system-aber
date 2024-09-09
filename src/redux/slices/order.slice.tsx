import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// type order = {
//   orderId: string;
//   customerId: string;
//   customer: string;
//   email: string;
//   contact: string;
//   address: string;
//   orders: string;
//   totalQuantity: string;
//   subTotal: string;
// };

type AddOrderArgs = {
  payload: {
    userId: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paidAmount: string;
    orders: any[];
    subTotal: number;
    totalPurchasedPrice: number;
    totalQuantity: number;
  };
  callback: (data: any) => void;
};

const initialState = {
  data: [],
  loading: false,
};

export const GetOrders = createAsyncThunk<any>("order/getOrders", async () => {
  const response = await axiosInstance.get("/order/get-orders");
  console.log(response);

  return response.data.orderList;
});

export const AddOrder = createAsyncThunk<any, AddOrderArgs>(
  "user/addOrder",
  async (data) => {
    console.log("async addOrder data", data);

    const response = await axiosInstance.post("/order/add-order", data.payload);
    data?.callback && data.callback(response);
    console.log("add-document response", response, response.status);
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
      console.log("action payload", action.payload);
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetOrders.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
