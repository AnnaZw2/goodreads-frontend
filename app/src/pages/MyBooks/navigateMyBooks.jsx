import { Link } from "react-router-dom";
import "./NavigateMyBooks.css";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../../context/userContex";
import { AddButton } from "../../components/AddNewShelf/AddButton";
import { updateContext } from "../../context/updateContext";
import { DeleteButton } from "../../components/deleteButton";
import { useClose } from "../../hooks/useClose";
import { UpdateButton } from "../../components/UpdateButton/UpdateButton";

export function NavigateMyBooks() {
  const { jwt } = useContext(userContext);
  const { update, setupdate } = useContext(updateContext);
  const [shelves, setShelves] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [hasCustom, setHasCustom] = useState(true);
  const buttonRef = useRef();

  useClose(buttonRef, () => {
    setEditing(false);
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/shelves", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setupdate(false);
        setShelves(res.data);
        const customArr = shelves.filter((el) => "custom" == el.type).length;

        customArr == 0 ? setHasCustom(false) : setHasCustom(true);
      })
      .catch((err) => console.log(err));
  }, [update, hasCustom]);

  const handleEdit = () => {
    editing ? setEditing(false) : setEditing(true);
  };

  return (
    <div>
      {/* shelves */}
      <ul
        ref={buttonRef}
        className="section [&>*:nth-child(5)]:border-b border-brown navigate-my-books flex flex-col   w-fit mt-5"
      >
        <li className="flex flex-row items-center justify-center relative">
          <p className="">Bookshelves</p>
          {hasCustom ? (
            <button
              className="text-xs absolute right-5 text-green  hover:underline"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : null}
        </li>
        <li className={"list-none "} key={"all"}>
          <Link to="/mybooks/shelves/all" className="links">
            All
          </Link>
        </li>

        {shelves.map((el) => (
          <li
            className={"list-none  flex items-center justify-center "}
            key={el._id}
          >
            <Link
              to={`/mybooks/shelves/${el.name.replace(/\s+/g, "-")}/${el._id}`}
              className="links"
            >
              {el.name}
            </Link>

            {el.type === "custom" && editing === true ? (
              <div className="ml-2 gap-2 flex justify-center ">
                <DeleteButton
                  textModal={
                    <p>
                      Are you sure you want to delete <strong>{el.name}</strong>{" "}
                      shelf?
                    </p>
                  }
                  textButton={
                    <i className="fa-regular fa-trash-can text-sm"></i>
                  }
                  request={() =>
                    axios
                      .delete(`http://localhost:3000/shelves/${el._id}`, {
                        headers: { Authorization: `Bearer ${jwt}` },
                      })
                      .then(() => setupdate(true))
                      .catch((err) => console.log(err))
                  }
                />
                <UpdateButton
                  className="m-1"
                  textButton={
                    <i className="fa-solid fa-pen-to-square text-black"></i>
                  }
                  textModal={
                    <p>
                      Are you sure you want to change name of{" "}
                      <strong>{el.name}</strong> shelf?
                    </p>
                  }
                  placeholder="Enter new name "
                  id={el._id}
                  patchKey={"name"}
                  url={`http://localhost:3000/shelves/${el._id}`}
                />
              </div>
            ) : null}
          </li>
        ))}

        <li className="border-t">
          {" "}
          <Link to="/mybooks/stats" className="links">
            Stats
          </Link>
        </li>
      
        <li>
          {" "}
          {!clicked ? (
            <button onClick={setClicked(true)}>Add</button>
          ) : (
            <AddButton
              background_btn={"bg-white"}
              background={"bg-light-beige"}
            />
          )}
        </li>
      </ul>
    </div>
  );
}
