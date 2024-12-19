import { Link } from "react-router-dom";
import { AddToShelf } from "../../pages/Home/addToShelf";
import { useEffect, useState } from "react";
// import ReactStars from "react-stars";

import StarsRating from "react-star-rate";
import axios from "axios";
import { useContext } from "react";

import { userContext } from "../../context/userContex";

export function Book({ title, cover, description, author, id, style }) {
  const [value, setValue] = useState(0);
  const { jwt } = useContext(userContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/book-details?book_id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => {
        if (res[0].rating) {
          setValue(res[0].rating);
        }
      });
  }, []);
  const ratingChanged = (newRating) => {
    axios
      .get(`http://localhost:3000/book-details?book_id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => {
        const tmpId = res[0]._id;

        axios
          .patch(
            `http://localhost:3000/book-details/${tmpId}`,
            { rating: newRating },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
          .then((res) => console.log(res));
      })
      .catch((err) => console.log(err));
    setValue(newRating);
  };

  return (
    <div className="flex justify-center mb-40 mx-auto p-8 h-78 border rounded-xl bg-white  max-w-4xl ">
      <img src={cover} className={` ${style.imgHeight} w-26`} />

      <div></div>
      <div className="flex bg-white flex-col ml-5">
        <h3 className="header-3 bg-white">{title}</h3>
        <p className="text-lg bg-white mb-6">by {author}</p>
        <div className="rating-container"></div>

        <div className="flex flex-col justify-center items-center">
         
          <StarsRating
            value={value}
            onChange={(newRating) => {
              ratingChanged(newRating);
            }}
          />

          <Link className="links bg-white ml-2" to={`/details/${id}`}>
            More...
          </Link>
          <AddToShelf bookId={id} />
        </div>
        <div className="bg-white">{description}</div>
      </div>
    </div>
  );
}
