// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice'
import productsApi from './features/products/productsApi';
import reviewsApi from './features/reviews/reviewsApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,  
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware,  reviewsApi.middleware),
});