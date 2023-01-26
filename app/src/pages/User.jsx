import { Navbar } from "../components/navbar";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./../context/userContex";
import { DeleteButton } from "../components/deleteButton";
import axios from 'axios'
import { UpdateButton } from "../components/UpdateButton/UpdateButton";
import { updateContext } from "../context/updateContext";
function User() {
    const { user, setUpdateUser, jwt } = useContext(userContext)
    const { update, setupdate } = useContext(updateContext);
    useEffect(() => {
        setupdate(false)
        axios.get(`http://localhost:3000/users/${user.email}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        }).then(res => setUpdateUser(res.data))
    }, [update])
    console.log(update)
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />

            <h4 className="header-4 p-3">My Profile</h4>

            <div>
                <p><strong>Email: </strong>{user.email}</p>
                <div className="flex flex-row justify-center gap-1">
                    <p><strong>Username:</strong> {user.username}</p>
                    <UpdateButton patchKey={"username"} textButton={"Edit"} textModal={<p>Are you sure you want to change this username?</p>} placeholder="Enter new username" url={`http://localhost:3000/users/${user.email}`} />
                </div>

                <DeleteButton textModal={"Are you sure you want to delet this account?"} textButton={"Delete account"} request={() => axios.delete(`http://localhost:3000/users/${user.email}`, { headers: { "Authorization": `Bearer ${jwt}` } }).then(res => navigate("/login")).catch(err => console.log(err))} /></div>
        </div>
    )

}


export { User }