
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../context/userContex";
import { updateShelfContext } from "../../context/updateShelfContext";


// this is component for view when you open "add new shelf" button and click "add"
// it changes the "add" button to view where you can input name of your new shelf
export function AddClicked({ setClicked, background, background_btn }) {
    const [inputValue, setInputValue] = useState("");
    const [CanClick, setCanClick] = useState(false);
    const [error, setError] = useState("");
    const [shelves, setShelves] = useState([])
    const { jwt } = useContext(userContext)

    const {  updateShelves,  setUpdateShelves } = useContext(updateShelfContext)

    const nameIsUnique =
        shelves.filter((el) => el.name == inputValue).length == 0;

    useEffect(() => {
        console.log(updateShelves)
        console.log("get shelves");
        axios
            .get("http://localhost:3000/shelves", { headers: { "Authorization": `Bearer ${jwt}` } })
            .then((res) => res.data)
            .then((res) => {
                setShelves(res);
                setUpdateShelves(false)
            })
            .catch((err) => console.log(err));
    }, [updateShelves]);


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
                    { sort: newSortValue, name: inputValue, type: "custom" },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${jwt}`
                        },
                    }
                )
                .then((res) => {
                    if (res.status == 201) {
                        setClicked(false)
                        setUpdateShelves(true)



                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div className={` ${background} btn-width border-t pb-1`}>
            <input
                type="text"
                placeholder="New shelf name"
                className="border m-3"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleKeyUp}
                autoFocus={true}
            ></input>
            {error.length != 0 ? <p className="text-red">{error}</p> : null}
            <button
                className={` ${CanClick ? `hover text-black ` : `text-light-gray cursor-auto`
                    } ${background_btn} px-2 border rounded-sm`}
                onClick={handleClick}
            >
                Add
            </button>
        </div>
    );
}
