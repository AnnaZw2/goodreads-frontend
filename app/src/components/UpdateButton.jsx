import axios from "axios";
import { useContext, useRef } from "react";
import { updateShelfContext } from "../context/updateShelfContext";
import { useState } from "react";
import { Modal } from "./Modal";
import { userContext } from "../context/userContex";
import { useClose } from "../hooks/useClose";

export function UpdateButton({ url, placeholder, textButton, textModal,patchKey}) {
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [inputValue, setInputValue] = useState(false);
  const [newValue, setNewValue] = useState("");

const {jwt} = useContext(userContext)
const ref = useRef()
useClose(ref,()=>{setInputValue(false)})


const request = () =>  axios.patch(url,{[patchKey]:newValue}, { headers: { "Authorization": `Bearer ${jwt}`,"Content-Type": "application/json" } }).then(res => console.log(res)).catch(err=> console.log(err))
  const handleUpdate = () => {
   inputValue ? setInputValue(false) : setInputValue(true);

  };
  const handleConfirm = () => {
    
      request()
      setInputValue(false)
    
  };

  function handleKeyUp(event) {
    if (event.key === 'Enter') {
        handleSubmit()
    }
};
  const handleSubmit = () => {
     setOpenConfirm(true);
    
  }

  const handleInput = (event) => {
    setNewValue(event.target.value);

    console.log("value is:", event.target.value);
  };

  return (
    <div className="relative">
      <button
      
        onClick={() => {
          handleUpdate();
        }}
        className="text-xs text-red relative"
      >
        {textButton}
      </button>
      {inputValue ? (
        <div ref={ref} className="absolute left-6 -top-7 z-10 bg-beige rounded-md shadow-md border border-light-gray" >
      

          <input
          autoFocus={true}
          placeholder={placeholder}
          className="m-4 border-beige"
            type="text"
            id="newValue"
            name="newValue"
            onChange={handleInput}
            onKeyUp={handleKeyUp}
            value={newValue}
          />
 
          <button  onClick={handleSubmit} className="border rounded-md bg-white p-1 text-light-brown hover:text-white hover:bg-light-brown">Submit</button>
          
        </div>
      ) : null}
      <div className="relative">
        {openConfirm ? (
          <Modal
            textModal={textModal}
            setOpenConfirm={setOpenConfirm}
            handleConfirm={handleConfirm}
            openConfirm={openConfirm}
          />
        ) : null}
      </div>
    </div>
  );
}
