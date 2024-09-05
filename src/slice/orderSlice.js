import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isCouponCleared: true,
  },
  reducers: {
    storeOrder(state, action) {
      console.log('storeOrder:', action.payload);
      state.order = action.payload;
    },
    // determine whether to apply coupon and update order total price
    setIsCouponCleared(state, action) {
      console.log('setIsCouponCleared: ',action.payload);
      
      state.isCouponCleared = action.payload;
    },
    // clearMessages(state) {
    //   return {};
    // },
  }
})

export const { storeOrder, setIsCouponCleared } = orderSlice.actions;

export default orderSlice.reducer;