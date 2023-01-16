import { Link } from "react-router-dom"
import "./NavigateMyBooks.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddClicked } from "../../components/AddNewShelf/AddClicked";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { addingNewShelf } from "../../context/addingNewShelf";



export function NavigateMyBooks() {
    const { jwt } = useContext(userContext)
    const { adding, setAdding } = useContext(addingNewShelf)
    const [shelves, setShelves] = useState([])
    const [clicked, setClicked] = useState(false)


    console.log(adding)
    useEffect(() => {
        console.log(shelves)
        axios.get("http://localhost:3000/shelves", { headers: { "Authorization": `Bearer ${jwt}` } })
            .then(res => {
                setAdding(false)
                setShelves(res.data)

            })
            .catch(err => console.log(err))

    }, [adding])

 

    return (
        <div>



            {/* shelves */}
            <ul className="section [&>*:nth-child(5)]:border-b border-brown navigate-my-books flex flex-col   w-fit">
            <li className="flex flex-row items-center justify-center relative">
    <p className="">Bookshelves</p> 
    <button className="text-xs absolute right-5 text-green  hover:underline" >Edit</button>
</li>
                <li className={"list-none "} key={"all"}> <Link to="/mybooks/shelves/all" className="links">All</Link></li>
                {shelves.map(el => <li className={"list-none"} key={el._id}> <Link to={`/mybooks/shelves/${el.name.toLowerCase().replace(/\s+/g, '')}`} className="links">{el.name}</Link>  
                        </li>)}
                <li className="border-t"> <Link to="/mybooks/stats" className="links">Stats</Link>
             
                    </li>
                {!clicked ? <button onClick={setClicked(true)}>Add</button> : <AddButton background_btn={"bg-white"} background={"bg-light-beige"} />}



            </ul>





        </div>
    )
}

