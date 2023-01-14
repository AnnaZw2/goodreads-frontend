import "./../addToShelf.css"
import { useState,useEffect } from "react";
import { store, open, close, add } from "../../../redux/newShelfReducer"
// this is component for view when you open "add new shelf" button and DON'T click "add" option in dropdown menu
// this is the DEFAULT view for opened "add new shelf" dropdown menu
export function AddNotClicked(){
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return unsubscribe;
    }, []);
    return (
        <button className="btn-style text-green hover" onClick={()=> {state.adding ? open() : add()}}>Add</button>
    )

}