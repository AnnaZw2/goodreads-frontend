import { Navbar } from "../components/navbar";
import { useLocation } from 'react-router-dom'
import { useContext, useEffect } from "react";
import { DisplayBooks } from "../components/books/displayBooks";
import { searchShelfContext } from "../context/searchContext";
export function Explore() {
 
    const {searchValue,searchOutput} = useContext(searchShelfContext)
    console.log("lllklklk",searchOutput)
    return (
        <div>
        <Navbar/>
        <div className="flex flex-wrap">
  {searchOutput.length !== 0 ? searchOutput.map((el) => (
    <div className="w-1/4 p-4">
      
      <img className="w-full" src={el.cover} alt={el.title} />
    </div>
  )) : null}
</div>

            <h3 className="header-3">Explore</h3>
            <p>Page is not completed yet</p>
        </div>
    )
}