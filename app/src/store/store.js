import { configureStore } from "@reduxjs/toolkit";
import CommentsReducer from "../reducers/CommentsSlice";
export const store = configureStore({
    reducer:{
  comments:CommentsReducer,
    }
  })