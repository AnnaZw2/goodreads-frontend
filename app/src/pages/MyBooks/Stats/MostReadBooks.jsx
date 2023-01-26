import axios from "axios"
import { useContext, useEffect,useState } from "react"
import { userContext } from "../../../context/userContex"
import "./../../../index.css"

export function MostReadBooks({url,text}){
const {jwt} = useContext(userContext)
const [count,setCount] = useState()
    useEffect(()=>{
        axios.get(url, {
            headers: { Authorization: `Bearer ${jwt}` },
          }).then((res)=> res.data).then(res => setCount(res.books_on_shelf.count)).catch((err)=> console.log(err))
    })
    return(
        <div className="mt-5   ">
            <h4 className="header-4">In general {text}  <strong>{count}</strong> books</h4>
        </div>
    )
}