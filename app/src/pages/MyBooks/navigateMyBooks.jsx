import { Link } from "react-router-dom"
import "./NavigateMyBooks.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { updateShelfContext } from "../../context/updateShelfContext";
import { DeleteButton } from "../../components/deleteButton";






export function NavigateMyBooks() {
    const { jwt } = useContext(userContext)
    const {  updateShelves,  setUpdateShelves } = useContext(updateShelfContext)
    const [shelves, setShelves] = useState([])
    const [clicked, setClicked] = useState(false)
    const [editing, setEditing] = useState(false)

    console.log(updateShelves)
    useEffect(() => {
        console.log(shelves)
        axios.get("http://localhost:3000/shelves", { headers: { "Authorization": `Bearer ${jwt}` } })
            .then(res => {
                setUpdateShelves(false)
                setShelves(res.data)

            })
            .catch(err => console.log(err))

    }, [updateShelves])

    const handleEdit = () => {
        console.log("edit",editing)
        editing ? setEditing(false) : setEditing(true)

    }


    return (
        <div>



            {/* shelves */}
            <ul className="section [&>*:nth-child(5)]:border-b border-brown navigate-my-books flex flex-col   w-fit">
                <li className="flex flex-row items-center justify-center relative">
                    <p className="">Bookshelves</p>
                    <button className="text-xs absolute right-5 text-green  hover:underline" onClick={handleEdit} >Edit</button>
                </li>
                <li className={"list-none "} key={"all"}>
                    <Link to="/mybooks/shelves/all" className="links">All</Link>
                </li>

                {shelves.map(el =>
                    <li className={"list-none  flex items-center justify-center"} key={el._id}>
                        <Link to={`/mybooks/shelves/${el.name.toLowerCase().replace(/\s+/g, '')}`} className="links">{el.name}</Link>
                        {console.log("custom",el.type=="custom")}
                        {el.type === "custom" && editing === true ? <div className="ml-2">
                        <DeleteButton textModal={<p>Are you sure you want to delete <strong>{el.name}</strong> shelf?</p>} textButton={"Delete"} request={()=> axios.delete(`http://localhost:3000/shelves/${el._id}`,{ headers: { "Authorization": `Bearer ${jwt}` } }).catch(err => console.log(err))} /></div> : null}
                    </li>)}

                <li className="border-t"> <Link to="/mybooks/stats" className="links">Stats</Link>

                </li>
                {!clicked ? <button onClick={setClicked(true)}>Add</button> : <AddButton background_btn={"bg-white"} background={"bg-light-beige"} />}



            </ul>





        </div>
    )
}

