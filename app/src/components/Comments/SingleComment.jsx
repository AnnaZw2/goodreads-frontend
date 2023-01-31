 import { formatDate } from "../../utils/functions/fromateDate"

 export function SingleComment({el}){
 

    return(


        <div className="flex flex-col mb-2 mt-2 justify-start w-full bg-white items-start border border-light-gray rounded-md p-3">
        <p>
          <strong>{el.created_by}</strong>
        </p>
        <p className="text-light-gray">{formatDate(el.created_at)}</p>

     {el.blocked.is_blocked ?   <div className=" mt-3 text-red">{el.content}</div> : <div className=" mt-3">{el.content}</div>}
      </div>
  
    
    )
 }