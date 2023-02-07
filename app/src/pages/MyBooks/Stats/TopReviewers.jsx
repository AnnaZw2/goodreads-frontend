import { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../../../context/userContex";
import axios from "axios";
import "./Stats.css"

export function TopReviewers() {
  const { jwt } = useContext(userContext);
  const [topReviewers, setTopReviewers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/stats/comments", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setTopReviewers(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-5 mb-10">
      <h4 className="header-4">Top Reviewers</h4>
      <div className="map-container">
        {topReviewers.length != 0
          ? topReviewers.map((el) => (
              <div key={el.user} className="w-1/5 p-2 flex flex-col gap-1">
                <p ><strong>{el.user}</strong></p>
                <p>Comments: <strong>{el.count}</strong></p>
              </div>
          ))
          : null}
      </div>
    </div>
  );
}
