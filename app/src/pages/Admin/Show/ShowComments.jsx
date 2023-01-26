import axios from "axios";
import { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContex";
import { updateShelfContext } from "../../../context/updateShelfContext";
import { useState } from "react";
import { searchShelfContext } from "../../../context/searchContext";
import "./../Admin.css";
import { Navbar } from "../../../components/navbar";
import { useNavigate } from "react-router-dom";
import { GoBack } from "../GoBackButton";
import { UpdateButton } from "../../../components/UpdateButton/UpdateButton";
import { formatDate } from "../../../utils/functions/fromateDate";
export function ShowComments() {
  const { jwt } = useContext(userContext);
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { searchAdmin, setSearchAdmin, searchOutput, setSearchOutput } =
    useContext(searchShelfContext);
  const handleInput = (event) => {
    setSearchAdmin(event.target.value);
  };


  useEffect(() => {

    axios
      .get("http://localhost:3000/comments", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => setComments(res.data))
      .then(() => setUpdateShelves(false))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/comments?search=${searchAdmin}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setComments(res.data);
      });
  }, [updateShelves]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/comments?search=${searchAdmin}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setComments(res.data);
      });
  }, [searchAdmin]);

  console.log(comments);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center items-center ">
        <h4 className="header-4 mt-6">Delete and edit comments</h4>
        <GoBack />
      </div>
      <div className="flex   overflow-auto justify-center flex-col items-center mt-5">
        <div className="input-container mb-10">
          <input
            type="search"
            value={searchAdmin}
            onChange={handleInput}
            placeholder="Search for content of comments"
            className="search rounded-md w-96"
          ></input>
        </div>
        <ul>
          {comments.length != 0 ? (
            comments.map((el) => (
              <li key={el._id} className="display-panel ">
                <p>
                  <strong>Created by: </strong>
                  {el.user}
                </p>

                <div className="flex  gap-2">
                  <strong>Comment: </strong>
                  {el.content}{" "}
                  <UpdateButton
                    className="m-1 ml-4"
                    textButton={
                      <i class="fa-solid fa-pen-to-square text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change content of comment published by{" "}
                        <strong>{el.user}</strong>?
                      </p>
                    }
                    placeholder="Enter new content "
                    id={el._id}
                    patchKey={"content"}
                    url={`http://localhost:3000/comments/${el._id}`}
                  />
                </div>
                <p>
                  <strong>Created at: </strong>
                  {formatDate(el.created_at)}
                </p>
                <p>
                  <strong>Updated at: </strong>
                  {formatDate(el.updated_at)}
                </p>
              </li>
            ))
          ) : (
            <p className="mt-4 text-lg">No comments</p>
          )}
        </ul>
      </div>
    </div>
  );
}
