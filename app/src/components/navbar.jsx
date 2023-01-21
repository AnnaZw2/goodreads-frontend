import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContex";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { searchShelfContext } from "../context/searchContext";

export function Navbar() {
  const navigate = useNavigate();

  const { user, setUpdateUser, jwt } = useContext(userContext);
  
  const {searchValue,setSearchValue,searchOutput, setSearchOutput}  = useContext(searchShelfContext)
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books?search=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSearchOutput(res.data);
        console.log(res.data);
      });
  }, [searchValue]);

  const handleInput = (event) => {
    setSearchValue(event.target.value);

    // console.log("value is:", event.target.value);
  };

  function handleKeyUp(event) {
    if (event.key === 'Enter') {
        navigate("/explore")
    }
};
 

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
      <div className="flex flex-row justify-center items-center align-middle   ">
        <input
          type="search"
          value={searchValue}
          onChange={handleInput}
          placeholder="Search books"
          onKeyUp={handleKeyUp}
          className="flex rounded-l-md w-80  border p-4  h-8 border-brown"
        ></input>
        <Link to="/explore" >
        <button   className="flex flex-row justify-center items-center rounded-r-md p-4 border border-brown  bg-white  h-8 align-top">
          <i className="fa-solid fa-magnifying-glass m-tb-4  w-5  flex items-center justify-center    "></i>
        </button></Link>
      </div>

      <div className="flex flex-row  ">
        {jwt != null ? (
          user.role == "admin" ? (
            <Link
              to="/admin"
              className=" text-black   w-fit p-3 hover:bg-black hover:text-beige"
            >
              Admin
            </Link>
          ) : null
        ) : null}

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
            localStorage.removeItem("decoded");
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
