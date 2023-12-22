import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/productList/productSlice';
import filterSlice from './features/productList/filterSlice';
import wishlistSlice from './features/wishlist/wishlistSlice';
import authReducer from "./features/authSlice";

export default configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    filter: filterSlice,
    wishlist: wishlistSlice,
    auth: authReducer
  },
});
