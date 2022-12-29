import "./../addToShelf.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function AddClicked({ setAdding, shelves }) {
  const [inputValue, setInputValue] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    console.log("change input value");
    if (inputValue.length != 0) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [inputValue]);

  function handleClick() {
    if(click){
        const newSortValue = shelves[shelves.length - 1].sort + 10;
    console.log(shelves[shelves.length - 1].sort);
    axios
      .post(
        "http://localhost:3000/shelves",
        { sort: newSortValue, name: inputValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(res => {if(res.status==200){
        setAdding(false)
      }})
      .catch((err) => console.log(err));


    }
    
   
  }

  return (
    <div className="btn-style  border-t pb-1">
      <input
        type="text"
        placeholder="New shelf name"
        className="border m-3"
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button
        className={` ${
          click ? `hover text-black ` : `text-light-gray cursor-auto`
        } bg-light-beige px-2 border rounded-sm`}
        onClick={handleClick}
      >
        Add
      </button>
    </div>
  );
}
