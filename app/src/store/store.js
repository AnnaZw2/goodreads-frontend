import { configureStore } from "@reduxjs/toolkit";
import CommentsReducer from "../reducers/CommentsReducer";
export const store = configureStore({
    reducer:{
  comments:CommentsReducer,
    }
  })