import { useRef } from "react";
import { useClose } from "../hooks/useClose";

import "./../index.css";
import "./Modal.css";

export function Modal({ textModal, form, setOpenConfirm, handleConfirm }) {
  const ref = useRef();
  useClose(ref, () => {
    setOpenConfirm(false);
  });
  return (
    <div className="modal-background ">
      <div ref={ref} className="modal-content">
        <div className="x-container">
          <button
            className="x-button"
            onClick={() => {
              setOpenConfirm(false);
            }}
          >
            X
          </button>
        </div>
        <div className="confirm-container">
          <h4 className="header-4 ">Confirm</h4>
        </div>
        <div className="text">{textModal}</div>
        {form}
        <div className="btn-container">
          <button
            className="cancel"
            onClick={() => {
              setOpenConfirm(false);
            }}
          >
            Cancel
          </button>
          <button
            className="continue "
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
