import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import "./addToShelf.css";
import { userContext } from "../../context/userContex";
import { store, open, close } from "../../redux/newShelfReducer"
import { AddNewShelf } from "./AddNewShelf/AddNewShelfButton";


export function AddToShelf({id}) {
  const [shelves, setShelves] = useState([]);

  const [state, setState] = useState(store.getState());
  useEffect(() => {
      const unsubscribe = store.subscribe(() => {
          setState(store.getState());
      });
      return unsubscribe;
  }, []);



  const { jwt } = useContext(userContext)



  const compare = (a, b) => {
    if (a.sort > b.sort) return 1;
    else return -1;
  };

  useEffect(() => {
    console.log("get shelves");
    axios
      .get("http://localhost:3000/shelves", { headers: { "Authorization": `Bearer ${jwt}` } })
      .then((res) => res.data)
      .then((res) => res.sort(compare))
      .then((res) => {
        setShelves(res);
      })
      .catch((err) => console.log(err));
  }, [state.adding]);

  const handleClick = () => {

    state.open ? close() : open()


  }


  return (
    <div className="manu-container   btn-width self-center ">
      <button
        className="menu-trigger border border-1 btn-width   p-3 bg-green hover:bg-dark-green text-white cursor-pointer"
        id= {id}
        onClick={handleClick}
      >
        Add to shelf
      </button>

      <ul className={`${state.open ? ` border   ` : null} dropdown-menu  absolute`}>
        {state.open

          ?

          shelves.map((el) => (
            <li key={el._id}>
              <button className="btn-style hover">{el.name}</button>
            </li>

          ))
          : null}
        {console.log(state.adding, state.open)}
      {state.open ?  <AddNewShelf background={'bg-white'} shelves={shelves}/> : null } 
   

      </ul>
    </div>
  );
}
