import { useState,useEffect, useRef } from "react"

import { AddClicked } from "./AddClicked"

export function AddButton({background,background_btn}){
    const [clicked,setClicked] = useState(false)
   
 
  

    return(

    <div>
    {!clicked ?  <button className={`btn-width ${background} text-green hover`} onClick={()=> {setClicked(true)}}>Add</button> :<AddClicked setClicked={setClicked} background={background} background_btn={background_btn} />  }
    </div>
    )
}