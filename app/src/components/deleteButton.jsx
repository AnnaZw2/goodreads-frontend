import axios from "axios";
import { useContext, useEffect } from "react";
import { updateShelfContext } from "../context/updateShelfContext";
import { userContext } from "../context/userContex";
import { useState } from "react";
import { Modal } from "./Modal";

export function DeleteButton({ request, textButton, textModal }) {
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext);
  const [openConfirm, setOpenConfirm] = useState(false);

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
        onClick={() => {
          handleDelete();
        }}
        className="text-xs text-red"
      >
        {textButton}
      </button>

      <div className="relative">
        {openConfirm ? (
          <Modal
            textModal={textModal}
            setOpenConfirm={setOpenConfirm}
            handleConfirm={handleConfirm}
          />
        ) : null}
      </div>
    </div>
  );
}
