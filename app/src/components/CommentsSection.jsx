import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CommentsList } from "../fetaures/CommentsList";
import { commentAdded } from "../fetaures/CommentsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { userContext } from "../context/userContex";
import { formatDate } from "../utils/functions/fromateDate";

export function CommentsSection({ bookId }) {

  const [input, setInput] = useState("");
  function getCurrentDate() {
    return new Date().toISOString();
  }
  const date = getCurrentDate()




  const { user } = useContext(userContext);
 
  const dipatch = useDispatch();
 
  return (
    <div className="ml-48 mr-48">
      <div className="flex justify-center items-center mt-8 mb-6 gap-5 bg-dark-beige rounded-md p-5 ">
        <textarea
   
          className="w-3/5 p-1"
          placeholder="Write your comment"
          onChange={(e) => setInput(e.target.value)}
     value={input}
        ></textarea>

        <button
          className="  bg-green w-22 m-0 h-12  text-white text-sm rounded-md p-1 hover:bg-dark-green hover:text-white"
          onClick={() => {
            dipatch(
              commentAdded({
                _id: nanoid(),
                created_by: user.email,
                created_at: date,
                content: input,
              })
            ),
              setInput("");
            
          }}
        >
          Add comment
        </button>
        {/* <button className="flex flex-col gap-1  text-sm  justify-center rounded-md bg-red  w-22 m-0 h-12 text-white  p-1 hover:bg-dark-red hover:text-white">Delete comment</button> */}
      </div>
      <CommentsList />
    </div>
  );
}
