import { createSlice, current } from "@reduxjs/toolkit";

type CartState = {
  cartData: {
    product: [];
    quantity: string;
  }[];
  loading: boolean;
};

const initialState: CartState = {
  cartData: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCart: (state, action) => {
      const productIndex = state.cartData.findIndex(
        (item: any) => item.product.id === action.payload.product.id
      );

      if (productIndex >= 0) {
        state.cartData[productIndex].quantity = (
          +state.cartData[productIndex].quantity + 1
        ).toString();
      } else {
        state.cartData.push(action.payload);
      }

      state.cartData.map((item) => {});
    },
    handleRemoveFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item: any) => item.product.id != action.payload.id
      );
    },
    handleCartQuantity: (state, action) => {
      const productIndex = state.cartData.findIndex(
        (item: any) => item.product.id === action.payload.id
      );
      if (productIndex >= 0 && action.payload.quantity > 0) {
        state.cartData[productIndex].quantity = action.payload.quantity;
      }
    },
    handleEmptyCart: (state) => {
      state.cartData = [];
    },
  },
});
export const {
  handleAddToCart,
  handleCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
