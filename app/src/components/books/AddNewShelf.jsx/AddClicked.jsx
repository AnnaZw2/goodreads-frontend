import "./../addToShelf.css";
import { useState, useEffect } from "react";
import axios from "axios";

// this is component for view when you open "add new shelf" button and click "add"
// it changes the "add" button to view where you can input name of your new shelf
export function AddClicked({ setAdding, shelves }) {
    const [inputValue, setInputValue] = useState("");
    const [CanClick, setCanClick] = useState(false);
    const [error, setError] = useState("");




    const nameIsUnique =
        shelves.filter((el) => el.name == inputValue).length == 0;


    useEffect(() => {

        if (inputValue.length != 0 && nameIsUnique) {
            setError("")
            setCanClick(true);

        } else {
            if (!nameIsUnique) {
                setError("Shelf already exists!");
            }
            setCanClick(false);
        }
    }, [inputValue]);




    function handleKeyUp(event) {
        if (event.key === 'Enter') {
            handleClick()
        }
    };

    function handleClick() {
        if (CanClick) {
            const newSortValue = shelves[shelves.length - 1].sort + 10;
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
                .then((res) => {
                    if (res.status == 200) {
                        setAdding(false);
                    }
                })
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
                onKeyUp={handleKeyUp}
            ></input>
            {error.length != 0 ? <p className="text-red">{error}</p> : null}
            <button
                className={` ${CanClick ? `hover text-black ` : `text-light-gray cursor-auto`
                    } bg-light-beige px-2 border rounded-sm`}
                onClick={handleClick}
            >
                Add
            </button>
        </div>
    );
}
