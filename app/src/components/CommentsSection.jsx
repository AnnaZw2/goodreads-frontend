import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { addComment } from "../reducers/CommentsReducer"
export function CommentsSection({bookId}){
const dispatch = useDispatch()
const mock_bookID = "bookID_1"
const [input,setInput] = useState("")
    const commentsList = useSelector((state) => state.comments[mock_bookID])
  

   return(
    <div>
        <div className="addComment">
           <textarea placeholder="Write your comment" onChange={(e)=> setInput(e.target.value)}></textarea>
           <button className="bg-green hover:bg-dark-green hover:text-white" onClick={()=>{dispatch(addComment({bookId:mock_bookID, text:input}))}}>Add comment</button>
        </div>

        <ul className="displayComments flex justify-center  items-center flex-col gap-2"> {commentsList.map(el => <li className="bg-yellow w-2/3 " key={el.id}>{el.text}</li>)}</ul>

    </div>
   )
}