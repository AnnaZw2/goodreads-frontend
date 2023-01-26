import { useState } from "react"
import { useDispatch } from "react-redux"
import { CommentsList } from "../reducers/CommentsList"

export function CommentsSection({bookId}){

   
  

   return(
    <div className="ml-48 mr-48">
        <div className="flex justify-center items-center mt-8 mb-6 gap-5 bg-dark-beige rounded-md p-5 ">
           <textarea className="w-3/5 p-1" placeholder="Write your comment" onChange={(e)=> setInput(e.target.value)}></textarea>
       

           <button className="  bg-green w-22 m-0 h-12  text-white text-sm rounded-md p-1 hover:bg-dark-green hover:text-white">Add comment</button>
           <button className="flex flex-col gap-1  text-sm  justify-center rounded-md bg-red  w-22 m-0 h-12 text-white  p-1 hover:bg-dark-red hover:text-white">Delete comment</button>
        </div>
<CommentsList/>
  

    </div>
   )
}