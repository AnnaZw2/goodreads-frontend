import axios from "axios";

import { useEffect, useState } from "react";
import { AddNotClicked } from "./AddNewShelf.jsx/AddNotClicked";
import { AddClicked } from "./AddNewShelf.jsx/AddClicked";
import "./addToShelf.css";
export function AddToShelf() {
  const [shelves, setShelves] = useState([]);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const compare = (a, b) => {
    if (a.sort > b.sort) return 1;
    else return -1;
  };

  useEffect(() => {
    console.log("get shelves");
    axios
      .get("http://localhost:3000/shelves")
      .then((res) => res.data)
      .then((res) => res.sort(compare))
      .then((res) => {
        setShelves(res);
      })
      .catch((err) => console.log(err));
  }, [adding]);



  return (
    <div className="manu-container   btn-width self-center ">
      <button
        className="menu-trigger border btn-width  p-3 bg-green hover:bg-dark-green text-white cursor-pointer"
        onClick={() => (open ? setOpen(false) : setOpen(true))}
      >
        Add to shelf
      </button>

      <ul className={`${open ? ` border ` : null} dropdown-menu  absolute`}>
        {open
       
          ? 
         
          shelves.map((el) => (
              <li key={el.id}>
                <button className="btn-style hover">{el.name}</button>
              </li>
           
            ))
          : null}
          {open ? adding ? <li><AddClicked  setAdding={setAdding} shelves={shelves}/></li>  : <AddNotClicked adding={adding} setAdding={setAdding}/>: null} 
     
      </ul>
    </div>
  );
}
