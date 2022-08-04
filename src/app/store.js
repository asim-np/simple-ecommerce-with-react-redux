import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../pages/cart/cartSlice';
import registerReducer from '../pages/register/RegisterSlice';
import loginReducer from '../pages/login/loginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer,
    register: registerReducer,
    login: loginReducer
  },
});
