import axios from "axios"
import { useContext, useEffect } from "react"
import { updateShelfContext } from "../context/updateShelfContext"
import { userContext } from "../context/userContex"
import {useState} from "react"

export function DeleteButton({id}){
    const {jwt} = useContext(userContext)
    const {updateShelves,setUpdateShelves} = useContext(updateShelfContext)
    const [confirm,setConfirm] = useState(null)
    const [openConfirm,setOpenConfirm] = useState(false)
console.log(updateShelves,"shelves")
    const handleDelete = () =>{
setOpenConfirm(true)


    }

    const handleConfirm=(shelfId) =>{
      
            axios.delete(`http://localhost:3000/shelves/${shelfId}`,{ headers: { "Authorization": `Bearer ${jwt}` } })
            .then(res => {console.log(res.data); })
            .catch(err => console.log(err))
         

    }
    return(
        <div>
        <button onClick={()=>{handleDelete()}} className="text-xs text-red">Delete</button>
        
        <div className="relative">
        
       
        {openConfirm ?
         <div className="bg-white w-32 absolute right-6">
         <p>Are you sure you want to delete this shelf?</p>

          <div className="flex flex-row gap-2 justify-center ">
          <button onClick={()=>{handleConfirm(id); setOpenConfirm(false),setUpdateShelves(true)}}><p className="text-green">Yes</p></button>
         <button onClick={()=>{setConfirm(false),setOpenConfirm(false)}}><p className="text-red">No</p></button>
         </div>

         </div>: null}

        </div>
        </div>
    )
}