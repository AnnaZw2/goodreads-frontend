import axios from "axios";

import { useContext, useEffect, useReducer, useState } from "react";
import { AddNotClicked } from "./AddNewShelf/AddNotClicked";
import { AddClicked } from "./AddNewShelf/AddClicked";
import "./addToShelf.css";
import { userContext } from "../../context/userContex";


export function AddToShelf() {
  const [shelves, setShelves] = useState([]);


  const { jwt } = useContext(userContext)
  const ACTIONS = {
    OPEN_MENU: "open-menu",
    CLOSE_MENU: "close-menu",
    ADDING: "add"
  }
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.OPEN_MENU:
        return { open: true, adding: false }
      case ACTIONS.CLOSE_MENU:
        return { open: false, adding: false }
      case ACTIONS.ADDING:
        return { open: true, adding: true }
      default:
        return state
    }

  }
  const [state, dispatch] = useReducer(reducer, { open: false, adding: false })


  function open() {
    dispatch({ type: ACTIONS.OPEN_MENU })
  }
  function close() {
    dispatch({ type: ACTIONS.CLOSE_MENU })
  }
  function add() {
    dispatch({ type: ACTIONS.ADDING })
  }




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
        {state.open ? state.adding ? <li>{console.log("adding active")}<AddClicked shelves={shelves} open={open} state={state} /></li> : <li>{console.log("adding not active")}<AddNotClicked state={state} open={open} add={add} /></li> : null}

      </ul>
    </div>
  );
}
