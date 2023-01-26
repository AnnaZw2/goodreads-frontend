import axios from "axios";
import { useContext, useEffect, useReducer, useState, useRef } from "react";
import "./addToShelf.css";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { updateContext } from "../../context/updateContext";

export function AddToShelf({ bookId }) {
  const [shelves, setShelves] = useState([]);
  const [selectedStandardShelves, setSelectedStandardShelves] = useState([]);
  const [standardIds, setStandardIds] = useState([]);
  const [customChecked, setCustomChecked] = useState({});
  const { jwt } = useContext(userContext);
  const { update, setupdate } = useContext(updateContext);
  const ref = useRef(false);

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
  }, [update]);

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
    axios
      .get(`http://localhost:3000/shelves`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => {
        const ids = res.filter((el) => el.type == "standard");
        const arrIds = ids.map((el) => el._id);
        setStandardIds(arrIds);
      })
      .catch((err) => console.log(err));
  }, []);



  useEffect(() => {

    const tmp = getArrayFromSelectedCustomShelves(customChecked);


    if (ref.current) {



      checkShelf(bookId);
    }
    ref.current = true;

  }, [customChecked, selectedStandardShelves]);

  function getArrayFromSelectedCustomShelves(_customChecked) {
    return Object.keys(_customChecked).filter((el) => _customChecked[el]);
  }

  function checkShelf(bookId) {
    axios
      .get(`http://localhost:3000/book-details?book_id=${bookId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        if (res.data.length != 0) {

          if (state.open) {

            axios
              .patch(
                `http://localhost:3000/book-details/${res.data[0]._id}`,
                {
                  shelves: selectedStandardShelves.concat(
                    getArrayFromSelectedCustomShelves(customChecked)
                  ),
                },
                {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-type": "application/json",
                  },
                }
              )
              .then(() => setupdate(true))
              .catch((err) => console.log(err));
          }
        } else {


          axios
            .post(
              `http://localhost:3000/book-details`,
              {
                shelves: selectedStandardShelves.concat(
                  getArrayFromSelectedCustomShelves(customChecked)
                ),

                book_id: bookId,
              },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  "Content-type": "application/json",
                },
              }
            )

            .then(() => setupdate(true))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  const handleClick = () => {

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

          axios
            .get(`http://localhost:3000/book-details/${info._id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((res) => {
              if (res.data.shelves) {

                let tmp = res.data.shelves.filter((el) =>
                  standardIds.includes(el)
                );
                let data = [...new Set(tmp)];


                setSelectedStandardShelves(data);

                let customObj = res.data.shelves.reduce((acc, curr) => {
                  if (!standardIds.includes(curr)) {
                    acc[curr] = true;
                  }
                  return acc;
                }, {});

                setCustomChecked(customObj);
              }


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

        setSelectedStandardShelves([]);

      } else {
        setSelectedStandardShelves([shelf._id]);

      }
    } else {
      if (selectedStandardShelves.includes(shelf._id)) {
        const filtered = selectedStandardShelves.filter(
          (el) => el != shelf._id
        );

        setSelectedStandardShelves(filtered);

      } else {
        setSelectedStandardShelves([...selectedStandardShelves, shelf._id]);

      }
    }
  }

  function handleCheckingCustom(shelf) {
    setCustomChecked({
      ...customChecked,
      [shelf._id]: !customChecked[shelf._id],
    });

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
        className={`${state.open ? ` border   ` : null
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
                      ? selectedStandardShelves.includes(el._id) || false
                      : customChecked[el._id] || false
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
      </ul>
    </div>
  );
}
