import { Navbar } from "../../components/navbar";
import { NavigateMyBooks } from "./navigateMyBooks";
import "./MyBooks.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { userContext } from "../../context/userContex";
import { useHash } from "../../hooks/useHash";
import { useLocation, useNavigate } from 'react-router-dom';
export function MyBooks({ shelfName, books, setBooks }) {
  const { jwt } = useContext(userContext);



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="w-full" />
      <div className="flex">
 
        <NavigateMyBooks className="mr-2 mt-6" />
        <div className="flex flex-col items-center justify-center w-full">
          <h3 className="header-3 flex mt-10 text-center mx-auto">
            {shelfName}
          </h3>
          {books.length !== 0 ? (
            <div className="grid grid-cols-6 gap-5 ">
              {books.map((el) => (
                <div key={el._id} className="relative">
                  <img key={el._id} src={el.cover} className="my-1 h-48"></img>
                  {/* <button onClick={()=>handleClick(el._id)}>  
        <i className="fa-solid fa-minus  icon-position text-black"></i></button> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mx-auto mt-10">
              There are no books on this shel yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
