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
  // const [selectedCustomShelves, setSelectedCustomShelves] = useState([]);
  const [standardIds, setStandardIds] = useState([]);
  const [customChecked, setCustomChecked] = useState({});
  useEffect(() => { }, [bookId]);

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
    axios
      .get(`http://localhost:3000/shelves`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => {
        const ids = res.filter((el) => el.type == "standard");
        const arrIds = ids.map(el => el._id)
        setStandardIds(arrIds);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   setSelectedCustomShelves(
  //     Object.keys(customChecked).filter((el) => customChecked[el])
  //   );

  //   console.log("customChecked", customChecked)
  //   console.log("selectedCustomShelevs", selectedCustomShelves);
  //   console.log("selectedStandardShelves", selectedStandardShelves);
  //   console.log(
  //     "selected shelves",
  //     selectedCustomShelves.concat(selectedStandardShelves)
  //   );
  // }, [customChecked]);

  useEffect(() => {
    console.log("on standard shelf", selectedStandardShelves)
    console.log("on custom shelf", customChecked)
    console.log(" on all shelves", selectedStandardShelves.concat(customChecked))
  }, [customChecked, selectedStandardShelves])

  function getArrayFromSelectedCustomShelves(_customChecked) {
    return Object.keys(_customChecked).filter((el) => _customChecked[el])
  }



  // function checkShelf(shelfId, bookId) {
  //   axios
  //     .get(`http://localhost:3000/book-details?book_id=${bookId}`, {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     })
  //     .then((res) => {
  //       if (res.data.length != 0) {
  //         axios
  //           .patch(
  //             `http://localhost:3000/book-details/${res.data[0]._id}`,
  //             {
  //               shelves: selectedStandardShelves.concat(getArrayFromSelectedCustomShelves(customChecked)),
  //             },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${jwt}`,
  //                 "Content-type": "application/json",
  //               },
  //             }
  //           )

  //           .then((res) => console.log(res))
  //           .catch((err) => console.log(err));
  //       } else {

  //         console.log(
  //           "to post",
  //           selectedStandardShelves
  //             .concat(getArrayFromSelectedCustomShelves(customChecked))
  //             .concat(shelfId)
  //         );
  //         console.log(
  //           "i am making post, becuase this book has no book details"
  //         );
  //         axios
  //           .post(
  //             `http://localhost:3000/book-details`,
  //             {
  //               shelves: selectedStandardShelves
  //                 .concat(getArrayFromSelectedCustomShelves(customChecked))
  //                 .concat(shelfId),
  //               book_id: bookId,
  //             },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${jwt}`,
  //                 "Content-type": "application/json",
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res);
  //             console.log("leaving post ");
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

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
    console.log(
      "selected shelf when clicking ",
      selectedStandardShelves.concat(getArrayFromSelectedCustomShelves(customChecked))
    );

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

          console.log("info is it shelf", info);
          axios
            .get(`http://localhost:3000/book-details/${info._id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((res) => {
              setSelectedStandardShelves(
                res.data.shelves.filter((el) => standardIds.includes(el))
              );
              console.log(
                "setting standard to",
                res.data.shelves.filter((el) => standardIds.includes(el))
              );
              // console.log(
              //   "selected standard after relode",
              //   selectedStandardShelves
              // );

              setCustomChecked(
                // res.data.shelves.filter((el) => !standardIds.includes(el))
                res.data.shelves.reduce((acc, curr) => {
                  if (!standardIds.includes(curr)) {
                    console.log("standardIds", standardIds)
                    console.log("curr inside !standard", curr)
                    // console.log("curr type of", typeof curr, typeof acc, typeof res.data.shelves)

                    acc[curr] = true;
                  }
                  console.log("curr", curr)
                  console.log("standartIds", standardIds)
                  console.log("akumulator acc", acc)
                  return acc;
                }, {})
              );

              // setSelectedCustomShelves(
              //   Object.keys(customChecked).filter((el) => customChecked[el])
              // );

              // console.log("customChecked", customChecked)
              // console.log(
              //   "selected custom after relode",
              //   getArrayFromSelectedCustomShelves(customChecked)
              // );
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
        // checkShelf(shelf._id, bookId);
      } else {
        setSelectedStandardShelves([shelf._id]);
        // checkShelf(shelf._id, bookId);
      }
    } else {
      if (selectedStandardShelves.includes(shelf._id)) {
        const filtered = selectedStandardShelves.filter(
          (el) => el != shelf._id
        );
        console.log("filtered", filtered);
        setSelectedStandardShelves(filtered);
        // checkShelf(shelf._id, bookId);
      } else {
        setSelectedStandardShelves([...selectedStandardShelves, shelf._id]);
        // checkShelf(shelf._id, bookId);
      }
    }
  }

  function handleCheckingCustom(shelf) {
    setCustomChecked({
      ...customChecked,
      [shelf._id]: !customChecked[shelf._id],
    });

    console.log("shelf", shelf);

    // checkShelf(shelf._id, bookId);
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
