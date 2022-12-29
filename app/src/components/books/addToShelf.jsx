import axios from "axios";
import { useEffect, useState } from "react";
export function AddToShelf() {
    const [shelves,setShelves] = useState([])
    const [open,setOpen] = useState(false)
    const compare = (a,b) => {
        if(a.sort > b.sort) return 1
        else return -1
    }
    useEffect(()=>{
        console.log("get shelves")
        axios
        .get("http://localhost:3000/shelves")
        .then((res) => res.data)
        .then((res) => res.sort(compare)).then(res => {
      
          setShelves(res)
        }
        )
        .catch((err) => console.log(err));
    },[])


  return (
    <div className="manu-container border rounded-md w-48 self-center">
      <button className="menu-trigger  w-48 p-3 bg-green hover:bg-dark-green text-white cursor-pointer  " onClick={()=> open ? setOpen(false) : setOpen(true)} >Add to shelf</button>
      <div className="dropdown-menu absolute">
        {open ? shelves.map(el => <ul className=""><li key={el.id}><button className=" bg-white hover:bg-light-beige w-48 p-1 hover:border-black">{el.name}</button></li></ul>) : null}
      </div>
    </div>
  );
}
