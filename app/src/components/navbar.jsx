import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContex";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { searchShelfContext } from "../context/searchContext";
import "./navbar.css"
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
    <nav className="navbar">
      <div className="div-center">
        <Link
          to="/"
          className="links-styling"
        >
          Home
        </Link>
        <Link
          to="/mybooks"
          className="links-styling"
        >
          My Books
        </Link>

        <Link
          to="/explore"
          className="links-styling"
        >
          Explore
        </Link>
      </div>
      <div className="input-container">
        <input
          type="search"
          value={searchValue}
          onChange={handleInput}
          placeholder="Search books"
          onKeyUp={handleKeyUp}
         className="search"
        ></input>
        <Link to="/explore" >
        <button   className="search-button">
          <i className="fa-solid fa-magnifying-glass  icon   "></i>
        </button></Link>
      </div>

      <div className="div-center  ">
        {jwt != null ? (
          user.role == "admin" ? (
            <Link
              to="/admin"
              className="links-styling"
            >
              Admin
            </Link>
          ) : null
        ) : null}

        <Link
          to="/users"
          className="links-styling"
        >
          My Profile
        </Link>

        <button
          className="links-styling"
          onClick={() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("decoded");
            navigate("/login");
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
