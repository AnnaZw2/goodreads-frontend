import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context/userContex"

function ShowUsers(){
    const {jwt} = useContext(userContext)
    const [users,setUsers] = useState([])
useEffect(()=>{
    axios.get("http://localhost:3000/users",{ headers: { "Authorization": `Bearer ${jwt}` } })
    .then(res=>setUsers(res.data) )
    .catch(err=> console.log(err))
    console.log(users)
},[])
    return(
        <div></div>
    )
}

export {ShowUsers}