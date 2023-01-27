import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./../../../index.css"
import { userContext } from "../../../context/userContex";
export function BestRating({url,text}) {
  const { jwt } = useContext(userContext);

  const [userStatsBooks, setUserStatsBooks] = useState({});
  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
      


        res.data.books.map((el) => {
          axios
            .get(`http://localhost:3000/books/${el._id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((res) => {
             
              setUserStatsBooks((prevState) => ({
                ...prevState,
                [res.data.cover]: el.average,
              }));
            });
        });
      });
  }, []);


  const sortedBooks = Object.keys(userStatsBooks).sort((a, b) => {
    return userStatsBooks[b] - userStatsBooks[a];
  });
  return (
    <div className="mt-5 ">
      <h4 className="header-4">{text}</h4>
      <div className="flex flex-row justify-center items-center mr-2">
        {sortedBooks.map((cover) => (
          <div key={cover} className="w-1/5 p-2">
            <img src={cover} alt="" className="h-48 w-auto object-cover" />
            <p className="text-xl font-medium">{userStatsBooks[cover].toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
