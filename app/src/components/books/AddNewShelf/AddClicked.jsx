import "./../addToShelf.css";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { userContext } from "../../../context/userContex";


// this is component for view when you open "add new shelf" button and click "add"
// it changes the "add" button to view where you can input name of your new shelf
export function AddClicked({ shelves ,open,state}) {
    const [inputValue, setInputValue] = useState("");
    const [CanClick, setCanClick] = useState(false);
    const [error, setError] = useState("");

   const {jwt} = useContext(userContext)


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
                    { sort: newSortValue, name: inputValue,type:"custom" },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`Bearer ${jwt}`
                        },
                    }
                )
                .then((res) => {
                    if (res.status == 201) {
                        open()
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