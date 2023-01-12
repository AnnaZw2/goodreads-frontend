import axios from "axios";
import { useEffect, useState} from "react";
import { Book } from "./book";

export  function DisplayBooks(){
    const [books, setBooks] = useState([]);

    const jwt = localStorage.getItem("jwt")
  

useEffect(() => {
  console.log("display books")
  axios
    .get("http://localhost:3000/books",{headers:{"Authorization":`Bearer ${jwt}`}})
    .then((res) => {

      setBooks(res.data);
     
    })

    .catch((err) => console.log(err) );
},[]);
return(
    <div>
     <ul>{books.map((el)=><li key={el._id} ><Book title={el.title} cover={el.cover} description={el.description} author={el.author}/></li>)}</ul>
   
     </div>
)
}
