import {  Link} from "react-router-dom"
import "./NavigateMyBooks.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContex";
import { newShelfContext } from "../../context/newShelfContext";
import { AddNewShelf } from "../../components/books/AddNewShelf/AddNewShelfButton";
import { AddClicked } from "../../components/books/AddNewShelf/AddClicked";
import { store, open, close, add } from "../../redux/newShelfReducer"

export function NavigateMyBooks() {
    const { jwt } = useContext(userContext)

    const [shelves, setShelves] = useState([])
    const { addedNewShelf } = useContext(newShelfContext)

    const [state, setState] = useState(store.getState());
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      });
      return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(shelves)
        axios.get("http://localhost:3000/shelves", { headers: { "Authorization": `Bearer ${jwt}` } })
            .then(res => {
                setShelves(res.data)
            })
            .catch(err => console.log(err))

    }, [addedNewShelf])

    return (
        <div>

            <div className="navigate-my-books flex flex-col   w-fit ">

                {/* shelves */}
                <ul className="section [&>*:nth-child(5)]:border-b border-brown ">
                    <p>Bookshelves</p>

                    <li className={"list-none "}> <Link to="/mybooks/shelves/all" className="links">All</Link></li>
                    {shelves.map(el => <li key={el._id} className={"list-none"}> <Link to={`/mybooks/shelves/${el.name.toLowerCase().replace(/\s+/g, '')}`} className="links">{el.name}</Link></li>)}

                    {/* {stats} */}
                    <li key="stats" className="border-t border-brown"><Link to="/mybooks/stats" className="links">Stats</Link></li>
                    <li><AddNewShelf background="bg-light-beige " ></AddNewShelf></li>
                </ul>
                 
          

            </div>
            
        </div>
    )
}

