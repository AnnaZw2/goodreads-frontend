import { useRef ,useState} from "react";
import { useClose } from "../../hooks/useClose";


import "./../../index.css";
import "./../Modal.css"

export function EditModal({ textModal, placeholder, setOpenConfirm, handleConfirm }) {
const ref = useRef()
useClose(ref,()=>{setOpenConfirm(false)})
const [newValue, setNewValue] = useState("");
const handleInput = (event) => {
    setNewValue(event.target.value);

    console.log("value is:", event.target.value);
  };
  return (
    <div className="modal-background fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
     <div ref={ref} className="modal-content relative  bg-white border rounded-lg p-6 z-20">
   
        <div className="absolute top-0 right-0 m-3">
          <button className="text-black  flex justify-center items-center rounded-sm hover:bg-light-gray w-8 h-8 font-medium hover:text-black focus:outline-none focus:text-black" onClick={() =>{ setOpenConfirm(false)}}>
            X
          </button>
        </div>
        <div className="text-lg font-medium mb-4">
          <h4 className="header-4">Confirm</h4>
        </div>
        <div className="text-gray-700 mb-4">{textModal}</div>
        <input
    autoFocus={true}
    placeholder={placeholder}
    className="m-4 border rounded-md p-2 border-black w-60 h-10"
      type="text"
      id="newValue"
      name="newValue"
      onChange={handleInput}

      value={newValue}
    />
        <div className="flex gap-3 justify-center">
          <button
            className="bg-transparent hover:bg-red text-red font-semibold hover:text-white py-2 px-4 border border-red hover:border-transparent rounded"
            onClick={() => {setOpenConfirm(false)}}
          >
            Cancel
          </button>
          <button
            className="bg-transparent  hover:bg-green text-green font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded"
            onClick={() => {
              setOpenConfirm(false);
              handleConfirm(newValue);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
