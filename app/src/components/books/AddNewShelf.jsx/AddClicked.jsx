import "./../addToShelf.css"
import { useState,useEffect } from "react"
import axios from "axios";



export function AddClicked({adding,setAdding}){
const [name,setName] = useState('')
const [click,setClick] = useState(false)




useEffect(() => {
    console.log("change input value")
    if(name.length!=0){
        setClick(true)
    }else{
        setClick(false)
    }

    
  },[name]);

    function handleClick(){
      console.log("clicked")
      
    //   axios.put("http://localhost:3000/shelves")
     
setAdding(false)
      console.log(adding)
      
       
    }
    return (
        <div  className="btn-style  border-t pb-1">
        <input type="text" placeholder="New shelf name" className="border m-3" onChange={(e)=> setName(e.target.value)}></input>
        <button className={` ${click ? `hover text-black ` : `text-light-gray cursor-auto` } bg-light-beige px-2 border rounded-sm`} onClick={handleClick} >Add</button>
        </div>
    )

}