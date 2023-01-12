import axios from "axios";

import { useEffect, useState } from "react";
import { AddNotClicked } from "./AddNewShelf.jsx/AddNotClicked";
import { AddClicked } from "./AddNewShelf.jsx/AddClicked";
import "./addToShelf.css";


export function AddToShelf() {
  const [shelves, setShelves] = useState([]);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const jwt = localStorage.getItem("jwt")
  const compare = (a, b) => {
    if (a.sort > b.sort) return 1;
    else return -1;
  };

  useEffect(() => {
    console.log("get shelves");
    axios
      .get("http://localhost:3000/shelves",{headers:{ "Authorization":`Bearer ${jwt}`}})
      .then((res) => res.data)
      .then((res) => res.sort(compare))
      .then((res) => {
        setShelves(res);
      })
      .catch((err) =>console.log(err) );
  }, [adding]);

const handleClick = () =>{
    adding ? setAdding(false) : null
    open ? setOpen(false)   : setOpen(true) 
}

  return (
    <div className="manu-container   btn-width self-center ">
      <button
        className="menu-trigger border btn-width  p-3 bg-green hover:bg-dark-green text-white cursor-pointer"
        onClick={handleClick}
      >
        Add to shelf
      </button>

      <ul className={`${open ? ` border ` : null} dropdown-menu  absolute`}>
        {open
       
          ? 
         
          shelves.map((el) => (
              <li key={el._id}>
                <button className="btn-style hover">{el.name}</button>
              </li>
           
            ))
          : null}
          {open ? adding ?  <li>{console.log("adding active")}<AddClicked  setAdding={setAdding} shelves={shelves}/></li>  :<li>{console.log("adding not active")}<AddNotClicked adding={adding} setAdding={setAdding}/></li> : null} 
     
      </ul>
    </div>
  );
}
