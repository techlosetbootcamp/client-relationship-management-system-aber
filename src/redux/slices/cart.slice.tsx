import { ProductProps } from "@/types/Types";
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartState = {
  cartData: {
    product: [];
    quantity: string;
  }[];
  loading: boolean;
};

const initialState: CartState = {
  cartData: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCart: (state, action) => {
      console.log("in add to cart reducer", current(state), action.payload);

      const productIndex = state.cartData.findIndex(
        (item: any) => item.product.id === action.payload.product.id
      );

      console.log("productIndex", productIndex);
      if (productIndex >= 0) {
        state.cartData[productIndex].quantity = (
          +state.cartData[productIndex].quantity + 1
        ).toString();
      } else {
        state.cartData.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartData));

      state.cartData.map((item) => {
        console.log("item", item);
      });
    },
    handleCartQuantity: (state, action) => {
      console.log("handle cart quantity reducer", state, action);
      const productIndex = state.cartData.findIndex(
        (item: any) => item.product.id === action.payload.id
      );
      if (productIndex >= 0 && action.payload.quantity > 0) {
        state.cartData[productIndex].quantity = action.payload.quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(handleAddToCart.pending, (state, action) => {
  //     state.loading = true;
  //   });

  //   builder.addCase(
  //     handleAddToCart.fulfilled,
  //     (state, action: PayloadAction<ProductProps[]>) => {
  //       (state.loading = false), (state.cartData = action.payload);
  //     }
  //   );
  //   builder.addCase(handleAddToCart.rejected, (state, action) => {
  //     state.loading = false;
  //   });
  // },
});
export const { handleAddToCart, handleCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
