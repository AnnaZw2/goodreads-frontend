import { json, Link, useParams } from "react-router-dom"
import "./NavigateMyBooks.css"
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { AddClicked } from "../../components/books/AddNewShelf.jsx/AddClicked";
import { userContext } from "../../context/userContex";

export function NavigateMyBooks() {
    const {jwt} = useContext(userContext)

    const [shelves,setShelves]= useState([])

    const arr = []
    useEffect(() => {
        console.log(shelves)
      axios.get("http://localhost:3000/shelves", { headers: { "Authorization": `Bearer ${jwt}` } })
            .then(res => {
                res.data.map(el => arr.push(el.name))
                setShelves(arr)
                
            })
            .catch(err=> console.log(err))
      
    }, [shelves])

    return (
        <div>

            <div className="navigate-my-books flex flex-col   w-fit">

                {/* shelves */}
                <div className="section [&>*:nth-child(5)]:border-b border-brown">
                    <p>Bookshelves</p>
                
                  <li className={"list-none "}> <Link to="/mybooks/shelves/all" className="links">All</Link></li> 
                    {shelves.map(el =><li  className={"list-none"}> <Link to={`/mybooks/shelves/${el.toLowerCase().replace(/\s+/g, '')}`} className="links">{el}</Link></li>)}

                </div>

                {/* stats */}
                <div className="section border-t-0 hover:underline">
                    <Link to="/mybooks/stats" className="links">Stats</Link>
                </div>

              
            </div>
        </div>
    )
}

