import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./../../../index.css"
import { userContext } from "../../../context/userContex";
export function BestRating({url,text}) {
  const { jwt } = useContext(userContext);
  const [userStats, setUserStats] = useState();
  const [userStatsBooks, setUserStatsBooks] = useState({});
  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        console.log(res.data.books);
        // setUserStats(res.data.books);

        res.data.books.map((el) => {
          axios
            .get(`http://localhost:3000/books/${el._id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((res) => {
              console.log(res.data);
              setUserStatsBooks((prevState) => ({
                ...prevState,
                [res.data.cover]: el.average,
              }));
            });
        });
      });
  }, []);

  console.log(userStatsBooks);
  const sortedBooks = Object.keys(userStatsBooks).sort((a, b) => {
    return userStatsBooks[b] - userStatsBooks[a];
  });
  return (
    <div className="mt-5 ml-48">
      <h4 className="header-4">{text}</h4>
      <div className="flex flex-row justify-center items-center mr-2">
        {sortedBooks.map((cover) => (
          <div key={cover} className="w-1/5 p-2">
            <img src={cover} alt="" className="h-48 w-auto object-cover" />
            <p className="text-xl font-medium">{userStatsBooks[cover]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
