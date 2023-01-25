import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  comments: {
    bookID_1: [
      { id: 1, text: "Książka jest świetna!" },
      { id: 2, text: "Niezwykle poruszająca!" },
      { id: 3, text: "Wciągnęła mnie bez reszty!" },
      { id: 4, text: "Polecam każdemu!" },
    ],
  },
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState:{

    bookID_1: [
      { id: 1, text: "Książka jest świetna!" },
      { id: 2, text: "Niezwykle poruszająca!" },
      { id: 3, text: "Wciągnęła mnie bez reszty!" },
      { id: 4, text: "Polecam każdemu!" },
    ],
} ,
  reducers: {
    addComment: (state, action) => {
      console.log(action.payload.bookId);

      state[action.payload.bookId].push({
        text: action.payload.text,
      });
    },
    editComment: (state, action) => {
        state[action.payload.bookId].filter(el => el.id==id)
    },
    deleteComment: (state, action) => {},
    setComment: (state, action) => {},
  },
});
//  async thunk pobieranie wszystkich komentarzy z API -> useEffect
// drugi async thunk który pobiera komentarze dla konkretenj książki

// 1.
// 2.  dodać post na naciśniećie add comment
// 3. wywołanie async thunka po resolvie posta w then

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
