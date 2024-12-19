 import axios from "axios"
import { useContext } from "react";
import { formatDate } from "../../utils/functions/fromateDate"
import { userContext } from "../../context/userContex"
import { DeleteButton } from "../deleteButton"

import { updateContext } from "../../context/updateContext";
 export function SingleComment({el}){
 const {update, setupdate} = useContext(updateContext)
const {jwt,user} = useContext(userContext)
    return(


        <div className="flex flex-col mb-2 mt-2 justify-start w-full bg-white items-start border border-light-gray rounded-md p-3">
          <div>

          {user.email === el.created_by ?
          <DeleteButton
                        textModal={
                          <p>
                            Are you sure you want to delete this comment?
    
                          </p>
                        }
                        textButton={
                          <i className="fa-regular text-black fa-trash-can text-sm"></i>
                        }
                        request={() =>
                          axios
                            .delete(`http://localhost:3000/comments/${el._id}`, {
                              headers: { Authorization: `Bearer ${jwt}` },
                            })
                            .then(() => {
                              setupdate(true);
                            })
                            .catch((err) => console.log(err))
                        }
                      /> : null

          }
          </div>
        <p>
          <strong>{el.created_by}</strong>
        </p>
      
        <p className="text-light-gray">{formatDate(el.created_at)}</p>

     {el.blocked.is_blocked ?   <div className=" mt-3 text-red">{el.content}</div> : <div className=" mt-3">{el.content}</div>}
      </div>
  
    
    )
 }