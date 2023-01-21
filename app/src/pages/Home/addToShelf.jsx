import axios from "axios";

import { useContext, useEffect, useReducer, useState } from "react";
import "./addToShelf.css";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { updateShelfContext } from "../../context/updateShelfContext";

export function AddToShelf() {
  const [shelves, setShelves] = useState([]);
  const [checked,setChecked] = useState(false)

  const { jwt } = useContext(userContext);
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext);
  const ACTIONS = {
    OPEN_MENU: "open-menu",
    CLOSE_MENU: "close-menu",
    ADDING: "add",
  };
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.OPEN_MENU:
        return { open: true, adding: false };
      case ACTIONS.CLOSE_MENU:
        return { open: false, adding: false };
      case ACTIONS.ADDING:
        return { open: true, adding: true };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { open: false, adding: false });

  function open() {
    dispatch({ type: ACTIONS.OPEN_MENU });
  }
  function close() {
    dispatch({ type: ACTIONS.CLOSE_MENU });
  }
  function add() {
    dispatch({ type: ACTIONS.ADDING });
  }

  const compare = (a, b) => {
    if (a.sort > b.sort) return 1;
    else return -1;
  };

  const [checkedStandardShelves, setCheckedStandardShelves] = useState([]);
  const [checkedCustomShelves, setCheckedCustomShelves] = useState([]);
  
  function handleStandardCheck(el) {
    if (checkedStandardShelves.includes(el._id)) {
        setCheckedStandardShelves([]);
    } else {
        setCheckedStandardShelves([el._id]);
    }
}

function handleCustomCheck(el) {
    if (checkedCustomShelves.includes(el._id)) {
        setCheckedCustomShelves(checkedCustomShelves.filter(id => id !== el._id));
    } else {
        setCheckedCustomShelves([...checkedCustomShelves, el._id]);
      }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/shelves", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => res.sort(compare))
      .then((res) => {
        setShelves(res);
       
      })
      .catch((err) => console.log(err));
  }, [updateShelves]);

  const handleClick = () => {
    state.open ? close() : open();
  };

  return (
    <div className="manu-container   btn-width self-center ">
      <button
        className="menu-trigger border border-1 btn-width   p-3 bg-green hover:bg-dark-green text-white cursor-pointer"
        onClick={handleClick}
      >
        Add to shelf
      </button>

      <ul
        className={`${
          state.open ? ` border   ` : null
        } dropdown-menu  absolute`}
      >
                {state.open
          ? shelves.map((el) => (
            <li key={el._id} className="flex items-center">
                <button className="btn-width bg-white hover flex-center relative"> 
                    {el.name}
                    <input
                        type="checkbox"
                        className="checkbox absolute left-1 top-1"
                        checked={el.type === 'standard' ? checkedStandardShelves.includes(el._id) : checkedCustomShelves.includes(el._id)}
                        onChange={() => {
                            el.type === 'standard' ? handleStandardCheck(el) : handleCustomCheck(el);
                        }
                        }
                    />
                </button>
            </li>

          ))
          : null}

        {state.open ? (
          <AddButton background_btn="bg-light-beige" background="bg-white" />
        ) : null}
        {/* {state.open ? state.adding ? <li>{console.log("adding active")}<AddClicked style={{background_btn:"bg-light-beige",background:"bg-white"}} shelves={shelves} open={open} state={state}  /></li> : <li>{console.log("adding not active")}<AddNotClicked style={{background_btn:"bg-light-beige"}} state={state} open={open} add={add} /></li> : null} */}
      </ul>
    </div>
  );
}
