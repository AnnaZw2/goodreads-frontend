import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { updateShelfContext } from "../../context/updateShelfContext";
import { userContext } from "../../context/userContex";
import { EditModal } from "./EditModal";
export function UpdateButton({
  url,
  placeholder,
  textButton,
  textModal,
  patchKey,
  style
}) {

  const [openEditing, setOpenEditing] = useState(false);

  const { jwt } = useContext(userContext);
const {setUpdateShelves} = useContext(updateShelfContext)
  const request = (newValue) =>
    axios
      .patch(
        url,
        { [patchKey]: newValue },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .then(()=> setUpdateShelves(true))
      
      .catch((err) => console.log(err));

  const handleUpdate = () => {
    openEditing ? setOpenEditing(false) : setOpenEditing(true);
  };
  const handleConfirm = (newValue) => {
    request(newValue);
    setOpenEditing(false);
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
      {openEditing ? (
        <div
       
          className="absolute left-6 -top-7 z-10 bg-beige rounded-md shadow-md border border-light-gray"
        >
          <EditModal
            textModal={textModal}
            setOpenConfirm={setOpenEditing}
            handleConfirm={handleConfirm}
            openConfirm={openEditing}
            placeholder={placeholder}
            style={style}
          />
          {/* <button  onClick={handleSubmit} className="border rounded-md bg-white p-1 text-light-brown hover:text-white hover:bg-light-brown">Submit</button> */}
        </div>
      ) : null}
      <div className="relative"></div>
    </div>
  );
}
