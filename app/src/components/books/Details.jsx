import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../context/userContex";
import { Navbar } from "../navbar";
import { CommentsSection } from "./CommentsSection";



function Details() {
  const { id } = useParams();
  const { jwt } = useContext(userContext);
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
let date = null
  console.log(details);
  
  return (
    <div>
    <Navbar/>
      {loading ? null : (
        <div className="flex mr-64 ml-64  mt-10 items-start">
          <img src={details.cover} className="h-80 mr-4 mt-5 "></img>
         
          <div className="flex flex-col justify-start items-start">
          <div className="p-4 border-b">
            <h4 className="header-4"><strong>{details.title}</strong></h4>
            <p className="">({details.serie} #{details.part_of_series})</p>
            <p className="text-xl mb-10">by {details.author}</p>
            <p className="ml-10 mr-10">{details.description}</p>
            </div>


            <div className="flex  flex-col  ml-10 items-start justify-start mt-4">
       
            <p><strong>Pages:</strong> {details.pages}</p>
            <p><strong>Edition:</strong>{details.edition}</p>
            <p><strong>Publisher:</strong>{details.publisher}</p>
            <p><strong>Publishing date: </strong>{ details.publishing_date.slice(0,10).split("-").reverse().join("-").replace("- ","-")

}</p>

            </div>

          </div>
     
        </div>
      )}
      <CommentsSection/>
    </div>
  );
}

export { Details };
