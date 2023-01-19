import "./../index.css";
import "./Modal.css"
import { useRef,useEffect } from "react";
import  useOutsideClick from "./../hooks/useClickOutside"

export function Modal({ textModal, setOpenConfirm, handleConfirm ,modalRef}) {

  return (
    <div className="modal-background fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
     <div ref={modalRef} className="modal-content relative  bg-white border rounded-lg p-6 z-20">
   
        <div className="absolute top-0 right-0 m-3">
          <button className="text-blackborder  rounded-sm p-2 hover:bg-light-brown font-medium hover:text-black focus:outline-none focus:text-black">
            <p onClick={() =>{ setOpenConfirm(false)}}>X</p>
          </button>
        </div>
        <div className="text-lg font-medium mb-4">
          <h4 className="header-4">Confirm</h4>
        </div>
        <div className="text-gray-700 mb-4">{textModal}</div>
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
              handleConfirm();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
