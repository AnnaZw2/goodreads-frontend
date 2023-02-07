import { useContext } from "react";
import { userContext } from "../../../context/userContex";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Stats.css";
export function TrendingNow() {
  const { jwt } = useContext(userContext);
  const [books, setBooks] = useState([]);
  const [userStatsBooks, setUserStatsBooks] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/stats/states/Currently%20Reading", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
  
        setBooks(res.data.books);
        res.data.books.map((el) => 
          axios.get(`http://localhost:3000/books/${el.book_id}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }).then((res)=> {
    
            setUserStatsBooks((prevState) => ({
                ...prevState,
                [res.data.cover]: el.count,
              }))
        })
        );
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);
  const sortedBooks = Object.keys(userStatsBooks).sort((a, b) => {
    return userStatsBooks[b] - userStatsBooks[a];
  });

  return (
    <div>
        <h4 className="header-4">Trending now </h4>

        <div className="map-container">
        {sortedBooks.slice(0,5).map((cover) =>  <div key={cover} className="w-1/5 p-2">
            <img src={cover} alt="" className="h-48 w-auto object-cover" />
            {/* <p className="text-xl font-medium">{userStatsBooks[cover]}</p> */}
          </div>)}
        </div>
    </div>
  );
}
