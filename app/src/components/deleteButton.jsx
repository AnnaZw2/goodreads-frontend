import axios from "axios";
import { useContext, useEffect,useRef } from "react";
import { updateShelfContext } from "../context/updateShelfContext";
import { useState } from "react";
import { Modal } from "./Modal";
import  useOutsideClick from "./../hooks/useClickOutside"

export function DeleteButton({ request, textButton, textModal }) {
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext);
  const [openConfirm, setOpenConfirm] = useState(false);

  
  
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  
  useOutsideClick(modalRef, buttonRef, () => {
    console.log("yuuuup")
    setOpenConfirm(false)});
 

  const handleDelete = () => {

    setOpenConfirm(true);
  };
  const handleConfirm = () => {
    request();
    setUpdateShelves(true);
  };

 
 

  return (
    <div>
      <button
      ref={buttonRef}
        onClick={() => {
          handleDelete();
        }}
        className="text-xs text-red"
      >
        {textButton}
      </button>

      <div className="relative"  >
        {openConfirm ? (
       
          <Modal
            modalRef={modalRef}
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
