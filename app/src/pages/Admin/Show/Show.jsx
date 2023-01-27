import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { searchShelfContext } from "../../../context/searchContext";
import { userContext } from "../../../context/userContex";
import { updateContext } from "../../../context/updateContext";
import axios from "axios";
export function Show({ header, display, placeholder, searchingFor }) {
  const navigate = useNavigate();

  const { jwt } = useContext(userContext);
  const { update, setupdate } = useContext(updateContext);
  const [data, setData] = useState([]);
  const { searchAdmin, setSearchAdmin } = useContext(searchShelfContext);

  const handleInput = (event) => {
    setSearchAdmin(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${searchingFor}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => setData(res.data))
      .then(() => setupdate(false))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/${searchingFor}?search=${searchAdmin}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [update]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${searchingFor}?search=${searchAdmin}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [searchAdmin]);
  return (
    <div>
      <div className="flex flex-row justify-center items-center ">
        <h4 className="header-4 mt-6">{header}</h4>
        <button
          className="bg-light-gray h-6 rounded-md  mt-4 pl-2 pr-2"
          onClick={() => navigate("/admin")}
        >
          Go back
        </button>
      </div>
      <div className="flex   overflow-auto justify-center flex-col items-center mt-5">
        <div className="input-container mb-10">
          <input
            type="search"
            value={searchAdmin}
            onChange={handleInput}
            placeholder={placeholder}
            className="search rounded-md w-96"
          ></input>
        </div>

        {display}
        {/* <ul className="mb-10">
          {users.length != 0 ? (
            users.map((el) => (
              <li key={el.email} className="display-panel">
                <p>
                  <strong>Email: </strong>
                  {el.email}
                </p>{" "}
                <div className="flex flex-row gap-4">
                  <p>
                    <strong>Username: </strong> {el.username}
                  </p>

                  <UpdateButton
                    className="m-1 ml-4"
                    textButton={
                      <i class="fa-solid fa-pen-to-square text-black"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change username of{" "}
                        <strong>{el.username}</strong>?
                      </p>
                    }
                    placeholder="Enter new name "
                    id={el._id}
                    patchKey={"username"}
                    url={`http://localhost:3000/users/${el.email}`}
                  />
                </div>
                <DeleteButton
                  textModal={
                    <p>
                      Are you sure you want to delete{" "}
                      <strong>{el.email}</strong> account?
                    </p>
                  }
                  textButton={"Delete account"}
                  request={() =>
                    axios
                      .delete(`http://localhost:3000/users/${el.email}`, {
                        headers: { Authorization: `Bearer ${jwt}` },
                      })
                      .then(() => setupdate(true))
                      .catch((err) => console.log(err))
                  }
                />
              </li>
            ))
          ) : (
            <p className="mt-4 text-lg">No users</p>
          )}
        </ul> */}
      </div>
    </div>
  );
}
