import axios from "axios";
import { useContext, useEffect, useReducer, useState, useRef } from "react";
import "./addToShelf.css";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { updateContext } from "../../context/updateContext";
import { useClose } from "../../hooks/useClose";

export function AddToShelf({ bookId }) {
  const [shelves, setShelves] = useState([]);
  const [selectedStandardShelves, setSelectedStandardShelves] = useState([]);
  const [standardIds, setStandardIds] = useState([]);
  const [customChecked, setCustomChecked] = useState({});
  const { jwt } = useContext(userContext);
  const { update, setupdate } = useContext(updateContext);
  const ref = useRef(false);
  const buttonRef = useRef();

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
  };
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.OPEN_MENU:
        return { open: true, adding: false };
      case ACTIONS.CLOSE_MENU:
        return { open: false, adding: false };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { open: false });

  function open() {
    dispatch({ type: ACTIONS.OPEN_MENU });
  }
  function close() {
    dispatch({ type: ACTIONS.CLOSE_MENU });
  }

  const compare = (a, b) => {
    if (a.sort > b.sort) return 1;
    else return -1;
  };

  useClose(buttonRef, () => {
    close();
  });
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
    state.open ? close() : open();
    console.log("clicked",state.open);
    axios
      .get(`http://localhost:3000/book-details?book_id=${bookId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
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
    <div className="btn-width  self-center">
      <button
        className="menu-trigger border  border-1  rounded  btn-width p-3 bg-green hover:bg-dark-green text-white cursor-pointer"
        onClick={handleClick}
      >
        Add to shelf
      </button>

      <ul
        ref={buttonRef}
        className={`${
          state.open ? "border" : null
        } dropdown-menu absolute w-48  rounded bg-white shadow-lg z-10`}
      >
        {state.open &&
          shelves.map((el) => (
            <li key={el._id}>
              <label className="flex items-center space-x-3 p-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={
                    el.type === "standard"
                      ? selectedStandardShelves.includes(el._id)
                      : customChecked[el._id]
                  }
                  onChange={() =>
                    el.type === "standard"
                      ? handleCheckingStandard(el)
                      : handleCheckingCustom(el)
                  }
                />
                <span className="text-gray-900">{el.name}</span>
              </label>
            </li>
          ))}

        {state.open && (
          <AddButton background_btn="bg-light-beige" background="bg-white" />
        )}
      </ul>
    </div>
  );
}