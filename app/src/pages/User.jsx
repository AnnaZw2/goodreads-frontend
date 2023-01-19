import { Navbar } from "../components/navbar";
import { useContext } from "react";
import { userContext } from "react";
function User(){
    const [user,updateUser] = useContext(userContext)
    // console.log(user)
    return(
        <div>
        <Navbar/>
        <h4 className="header-4 p-3">My Profile</h4>
        <p></p>
        </div>
    )

}


export {User}