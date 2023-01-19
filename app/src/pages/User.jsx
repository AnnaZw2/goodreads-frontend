import { Navbar } from "../components/navbar";
import { useContext } from "react";
import { userContext } from "./../context/userContex";
import { DeleteButton } from "../components/deleteButton";
import axios from 'axios'
function User(){
    const {user,jwt} = useContext(userContext)

  
    return(
        <div>
        <Navbar/>
        <h4 className="header-4 p-3">My Profile</h4>
        <p>Email: {user.email}</p>
        <DeleteButton text={"Delete account"} request={axios.delete(`http://localhost:3000/users/{${user.email}}`,{ headers: { "Authorization": `Bearer ${jwt}` }}).catch(err => console.log(err))}/>
        </div>
    )

}


export {User}