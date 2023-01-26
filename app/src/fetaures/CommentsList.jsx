import { useSelector } from "react-redux";
import {selectAllComments} from "./CommentsSlice.js"
import { formatDate } from "../utils/functions/fromateDate.js";
export function CommentsList(){
    const comments = useSelector(selectAllComments)
    const renderedComments = comments.map(el =>{
        const date = formatDate(el.created_at)
        return (
            <div key={el._id}  className="flex  justify-center items-center  ">
            
<div className="flex flex-col mb-2 mt-2 justify-start w-full bg-white items-start border border-light-gray rounded-md p-3">
            <p><strong>{el.created_by}</strong></p>
             <p className="text-light-gray">{date}</p> 
               
                <div className=" mt-3">{el.content}</div>
            </div>
            </div>
        )
    })
    return(
        <div>
     {renderedComments}
  

        </div>
    )
}