import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    createMessage(state, action) {
      console.log('createMessage:', action.payload);
      const id = new Date().getTime();
      // push to initialState
      if (action.payload.success){
        state.push({
          id,
          type: 'success',
          title: '更新成功',
          text: action.payload.message,
        });
      } else {
        state.push({
          id,
          type: 'danger',
          title: '更新失敗',
          text: Array.isArray(action.payload?.message)
          ? action.payload?.message.join('、')
          : action.payload?.message,
        });
      }
      
    },
    clearMessages(state) {
      return [];
    },
  }
})

export const { createMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;