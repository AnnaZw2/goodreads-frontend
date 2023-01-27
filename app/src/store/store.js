import { configureStore } from "@reduxjs/toolkit";
import CommentsReducer from "../fetaures/CommentsSlice";
export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
  }
})