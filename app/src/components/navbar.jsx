import { useContext,useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContex";


export function Navbar() {
  const navigate = useNavigate();

  const {user,setUpdateUser} = useContext(userContext)
  




  return (
    <nav className="bg-beige flex flex-row align-top justify-between">
      <div className="flex  flex-row ">
        <Link
          to="/"
          className="flex  justify-start text-black  p-3  hover:bg-black hover:text-white w-fit"
        >
          Home
        </Link>
        <Link
          to="/mybooks"
          className="flex justify-center text-black p-3  w-fit hover:bg-black hover:text-white"
        >
          My Books
   
        </Link>
     

        <Link
          to="/explore"
          className="flex justify-center text-black p-3  w-fit hover:bg-black hover:text-white"
        >
          Explore
        </Link>
      </div>
      <div className="flex flex-row align-center    self-center">
        <input
          type="search"
          placeholder="Search books"
          className="flex  sm:h-9  p-4  rounded-md w-80 border border-brown 
"
        ></input>
      </div>

      <div className="flex flex-row  ">
      {user.role=="admin" ?
        <Link
          to="/admin"
          className=" text-black   w-fit p-3 hover:bg-black hover:text-beige"
        >
          Admin
        </Link> : null }

    
        <Link
          to="/users"
          className=" text-black   w-fit p-3 hover:bg-black hover:text-beige"
        >
          My Profile
        </Link>

        <button
          className=" hover:bg-black p-3 hover:text-white"
          onClick={() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("decoded")
            // setUpdateUser(null)
            navigate("/login");
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
