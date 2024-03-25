import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import authReducer from './slices/auth'
import productReducer from './slices/product'
const reducer = {
  auth:authReducer,
  userAbout: userReducer,
  product:productReducer
}
const store = configureStore({
    reducer: reducer,
    devTools: true,
  });


export default store;