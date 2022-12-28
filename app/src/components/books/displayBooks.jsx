import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "./book";
export  function DisplayBooks(){
    const [books, setBooks] = useState([]);
  

useEffect(() => {
  axios
    .get("http://localhost:3000/")
    .then((res) => {

      setBooks(res.data);
     
    })

    .catch((err) => console.log(err));
});
return(
    <div>

     {/* <ul> {books.map(el=><li key={el.id}><img className="h-32 w-auto" src={el.cover} ></img></li>)}</ul> */}
     <ul>{books.map((el)=><li key={el.id} ><Book title={el.title} cover={el.cover} description={el.description} author={el.author}/></li>)}</ul>
     </div>
)
}
