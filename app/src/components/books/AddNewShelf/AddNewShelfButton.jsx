import { store, open, close, add } from "../../../redux/newShelfReducer";
import { AddClicked } from "./AddClicked";
import { AddNotClicked } from "./AddNotClicked";
import { useState, useEffect } from "react";
export function AddNewShelf({background}) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return unsubscribe;
  }, []);




  return (
    <ul>
       {
        state.adding ? (
          <li>
            {console.log("adding active")}
            <AddClicked background={background} />
          </li>
        ) : (
          <li>
            {console.log("adding not active")}
        
            <AddNotClicked/>
          </li>
        )
      }
    </ul>
  );
}
