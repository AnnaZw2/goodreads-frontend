import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../../../components/deleteButton";
import { Navbar } from "../../../components/navbar";
import { UpdateButton } from "../../../components/UpdateButton/UpdateButton";
import { searchShelfContext } from "../../../context/searchContext";
import { updateShelfContext } from "../../../context/updateShelfContext";
import { userContext } from "../../../context/userContex";
import { GoBack } from "../GoBackButton";
import "./../../../index.css"
import "./../Admin.css"

function ShowUsers() {
  const { jwt } = useContext(userContext);
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext)
  const [users, setUsers] = useState([]);

  const { searchAdmin, setSearchAdmin, searchOutput, setSearchOutput } = useContext(searchShelfContext)
  const handleInput = (event) => {
    setSearchAdmin(event.target.value);

  };
 

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => setUsers(res.data))
      .then(() => setUpdateShelves(false))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/users?search=${searchAdmin}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers(res.data);

      });
  }, [updateShelves]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users?search=${searchAdmin}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {

        setUsers(res.data);

      });
  }, [searchAdmin]);




  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center items-center ">
        <h4 className="header-4 mt-6">Delete and edit users</h4>
        <GoBack/>
      </div>
      <div className="flex   overflow-auto justify-center flex-col items-center mt-5">

        <div className="input-container mb-10">
          <input
            type="search"
            value={searchAdmin}
            onChange={handleInput}
            placeholder="Search for users"
            className="search rounded-md w-96"
          ></input>

        </div>
        <ul className="mb-10">
          {users.length != 0 ? users.map((el) => (
            <li key={el.email} className="display-panel">
              <p>
                <strong>Email: </strong>
                {el.email}
              </p>{" "}
              <div className="flex flex-row gap-4">

                <p><strong>Username: </strong> {el.username}</p>

                <UpdateButton
                  className="m-1 ml-4"
                  textButton={
                    <i class="fa-solid fa-pen-to-square text-black"></i>
                  }
                  textModal={
                    <p>
                      Are you sure you want to change username of {" "}
                      <strong>{el.username}</strong>?
                    </p>
                  }
                  placeholder="Enter new name "

                  id={el._id}
                  patchKey={"username"}
                  url={`http://localhost:3000/users/${el.email}`}
                />
              </div>
              <DeleteButton textModal={<p>Are you sure you want to delete <strong>{el.email}</strong> account?</p>} textButton={"Delete account"} request={() => axios.delete(`http://localhost:3000/users/${el.email}`, { headers: { "Authorization": `Bearer ${jwt}` } }).then(() => setUpdateShelves(true)).catch(err => console.log(err))} />
            </li>
          )) : <p className="mt-4 text-lg">No users</p>}

        </ul>
      </div>
    </div>
  );
}

export { ShowUsers };
