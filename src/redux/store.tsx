import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice'
import userSlice from './slices/user.slice'
import cartSlice from './slices/cart.slice'

export const store = configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice,
        cart : cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch