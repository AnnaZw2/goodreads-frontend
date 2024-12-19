import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CommentsList } from "../../fetaures/CommentsList";
import { commentAdded } from "../../fetaures/CommentsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { userContext } from "../../context/userContex";
import { formatDate } from "../../utils/functions/fromateDate";
// comments section with redux and mock data no interaction with backend
export function CommentsSection({ bookId }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState('')
  function getCurrentDate() {
    return new Date().toISOString();
  }
  const date = getCurrentDate();

  const { user } = useContext(userContext);

  const dipatch = useDispatch();



  return (
    <div className="ml-48 mr-48">
      <div className="mt-5"> {msg.length != 0 ? <p className="text-red bg-dark-beige p-1">{msg}</p> : null}</div>
      <div className="flex justify-center items-center mb-6 gap-5 bg-dark-beige rounded-md p-5 ">

        <textarea
          className="w-3/5 p-1"
          placeholder="Write your comment"
          onChange={(e) => {
            setInput(e.target.value); if (input.trim().length > 0) {
              setMsg("")
            }
          }}
          value={input}
        ></textarea>

        <button
          className="  bg-green w-22 m-0 h-12  text-white text-sm rounded-md p-1 hover:bg-dark-green hover:text-white"
          onClick={() => {
            if (input) {
              dipatch(
                commentAdded({
                  _id: nanoid(),
                  created_by: user.email,
                  created_at: date,
                  content: input,
                })
              ),
                setInput("");
            } else {
              if(input)
              setMsg("Comment content can't be empty!")
            }
          }}
        >
          Add comment
        </button>

      </div>
      <CommentsList />
    </div>
  );
}
