import { createSlice } from "@reduxjs/toolkit";

const POST_URL = `http://localhost:3000/comments`;
const jwt = localStorage.getItem("jwt");

const initialState = [
  {
    _id: "63cc24e08412c906caed2fe2",
    book_id: "63c415e8ec82ababbea1f69c",
    content: "I love this book!!",
    user: "aga@mail.pl",
    created_by: "aga@mail.pl",
    created_at: "2023-01-21T17:46:08.365Z",
    updated_at: "2023-01-26T12:47:13.672Z",
    __v: 0,
  },
  {
    _id: "63cc25218412c906caed2fe6",
    book_id: "63c415e8ec82ababbea1f69c",
    content: "Could be better :(",
    user: "julia@nowak.pl",
    created_by: "julia@nowak.pl",
    created_at: "2023-01-21T17:47:13.676Z",
    updated_at: "2023-01-21T17:47:13.676Z",
    __v: 0,
  },
  {
    _id: "63cc252e8412c906caed2fe8",
    book_id: "63c415e8ec82ababbea1f69c",
    content: "My favourite book!",
    user: "ania@mail.pl",
    created_by: "ania@mail.pl",
    created_at: "2023-01-21T17:47:26.078Z",
    updated_at: "2023-01-21T17:47:26.078Z",
    __v: 0,
  },
];

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    commentAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { commentAdded } = commentsSlice.actions;
export const selectAllComments = (state) => state.comments;
export default commentsSlice.reducer;

