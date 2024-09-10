import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice'
import userSlice from './slices/user.slice'
import cartSlice from './slices/cart.slice'
import documentSlice from './slices/document.slice'
import orderSlice from './slices/order.slice'
import productSlice from './slices/product.slice'

export const store = configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice,
        cart : cartSlice,
        document : documentSlice,
        order : orderSlice,
        product : productSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch