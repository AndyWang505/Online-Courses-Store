import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slice/messageSlice";
import orderReducer from "./slice/orderSlice";

export const store = configureStore({
  reducer : {
    message: messageReducer,
    order: orderReducer,
  },
})