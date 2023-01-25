import axios from "axios";
import { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContex";
import { updateShelfContext } from "../../../context/updateShelfContext";
import { useState } from "react";
import { searchShelfContext } from "../../../context/searchContext";
import "./../Admin.css"
import { Navbar } from "../../../components/navbar";
import { useNavigate } from "react-router-dom";

export function ShowComments() {
  const { jwt } = useContext(userContext);
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext)
  const [comments, setComments] = useState([]);
const navigate = useNavigate()
  const { searchAdmin, setSearchAdmin, searchOutput, setSearchOutput } = useContext(searchShelfContext)
  const handleInput = (event) => {
    setSearchAdmin(event.target.value);

  };

  function formatDate(dateString) {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
  }

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

  console.log(comments)

  return (
    <div>
    <Navbar />
    <div className="flex flex-row justify-center items-center ">
      <h4 className="header-4 mt-6">Delete and edit comments</h4>
      <button className="bg-light-gray h-6 rounded-md  mt-4 pl-2 pr-2" onClick={() => navigate("/admin")}>Go back</button>
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
      {comments.length != 0 ? comments.map(el => <li key={el._id} className="display-panel ">
        <p><strong>Created by: </strong>{el.user}</p>
        <div ><strong>Comment: </strong>{el.content}</div>
        <p><strong>Created at: </strong>{formatDate(el.created_at)}</p>
        <p><strong>Updated at: </strong>{formatDate(el.updated_at)}</p></li>) :  <p className="mt-4 text-lg">No comments</p>}
    </ul>
    </div>
    </div>

  )
}

