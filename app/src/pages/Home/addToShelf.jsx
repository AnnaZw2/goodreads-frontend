import axios from "axios";

import { useContext, useEffect, useReducer, useState } from "react";
import "./addToShelf.css";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { updateShelfContext } from "../../context/updateShelfContext";

export function AddToShelf({ bookId }) {
  const [shelves, setShelves] = useState([]);
  const [selectedShelves, setSelectedShelves] = useState([]);
  const [selectedStandardShelves, setSelectedStandardShelves] = useState([]);
  const [selectedCustomShelves, setSelectedCustomShelves] = useState([]);
  const [standardIds, setStandardIds] = useState([]);
  useEffect(() => {}, [bookId]);

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

  useEffect(() => {
    // setSelectedShelves(selectedCustomShelves.concat(selectedStandardShelves));
    console.log("custom", selectedCustomShelves);
    console.log("standard", selectedStandardShelves);
    console.log("selected shelves", selectedCustomShelves.concat(selectedStandardShelves));
  }, [selectedCustomShelves, selectedStandardShelves]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/shelves`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => {
        const ids = res.filter((el) => el.type == "standard");
        console.log("ids", ids);
        setStandardIds(ids);
      })
      .catch((err) => console.log(err));
  }, []);

  function checkShelf(shelfId, bookId) {
    // console.log("selected shelves", selectedShelves);
    axios
      .get(`http://localhost:3000/book-details?book_id=${bookId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        console.log("loging book details search resp", res.data);

        if (res.data.length != 0) {
          // if (selectedShelves.includes(shelfId)) {
          //   setSelectedShelves(selectedShelves.filter((id) => id !== shelfId));
          // } else {
          //   setSelectedShelves([...selectedShelves, shelfId]);
          // }

          axios
            .patch(
              `http://localhost:3000/book-details/${res.data[0]._id}`,
              { shelves: selectedStandardShelves.concat(selectedCustomShelves) },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  "Content-type": "application/json",
                },
              }
            )

            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } else {
          // setSelectedShelves([...selectedShelves, shelfId]);
          // if (selectedShelves.length === 0) {
          //   setSelectedShelves([]);
          // }
          console.log("to post", selectedStandardShelves.concat(selectedCustomShelves).concat(shelfId));
          console.log(
            "i am making post, becuase this book has no book details"
          );
          axios
            .post(
              `http://localhost:3000/book-details`,
              { shelves: selectedStandardShelves.concat(selectedCustomShelves).concat(shelfId), book_id: bookId },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  "Content-type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log(res);
              console.log("leaving post ");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
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
    console.log("selected shelf when clicking ", selectedStandardShelves.concat(selectedCustomShelves));


    axios
      .get(`http://localhost:3000/book-details?book_id=${bookId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        console.log("res data [0]", res.data);
        return res.data[0];
      })
      .then((info) => {
        if (info != undefined) {
          console.log("info", info);
          axios
            .get(`http://localhost:3000/book-details/${info._id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((res) => {
          
          
              setSelectedStandardShelves(
                res.data.shelves.filter((el) => el == standardIds)
              );
              console.log(
                "setting standard to",
                res.data.shelves.filter((el) => el == standardIds)
              );
              console.log(
                "selected standard after relode",
                selectedStandardShelves
              );
              setSelectedCustomShelves(
                res.data.shelves.filter((el) => el != standardIds)
              );

              // console.log(selectedShelves)
            })
            .catch((err) => console.log(err));
        }
      })

      .catch((err) => console.log(err));
    state.open ? close() : open();
  };

  function handleCheckingStandard(shelf) {
    if (selectedStandardShelves.length == 1) {
      if (shelf._id == selectedStandardShelves[0]) {
        console.log("is equal true", shelf._id == selectedStandardShelves);
        setSelectedStandardShelves([]);
        checkShelf(shelf._id, bookId);
      } else {
        setSelectedStandardShelves([shelf._id]);
        checkShelf(shelf._id, bookId);
      }
    } else {
      if (selectedStandardShelves.includes(shelf._id)) {
        const filtered = selectedStandardShelves.filter(
          (el) => el != shelf._id
        );
        console.log("filtered", filtered);
        setSelectedStandardShelves(filtered);
        checkShelf(shelf._id, bookId);
      } else {
        setSelectedStandardShelves([...selectedStandardShelves, shelf._id]);
        checkShelf(shelf._id, bookId);
      }
    }
  }

  function handleCheckingCustom(shelf) {
    if (selectedCustomShelves.includes(shelf._id)) {
      const filtered = selectedCustomShelves.filter((el) => el != shelf._id);
      console.log("filtered", filtered);
      setSelectedCustomShelves([filtered]);
      checkShelf(shelf._id, bookId);
    } else {
      setSelectedCustomShelves([...selectedCustomShelves, shelf._id]);
      checkShelf(shelf._id, bookId);
    }
  }

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
                    checked={
   el.type == "standard"
   ? selectedStandardShelves.includes(el._id) 
   : selectedCustomShelves.includes(el._id)
}

                    onChange={() =>
                      el.type == "standard"
                        ? handleCheckingStandard(el)
                        : handleCheckingCustom(el)
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
