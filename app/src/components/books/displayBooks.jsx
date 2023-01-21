import axios from "axios";
import { useContext, useEffect, useState} from "react";
import { userContext } from "../../context/userContex";
import { Book } from "./book";

export  function DisplayBooks({books}){
    // const [books, setBooks] = useState([]);


    


// useEffect(() => {
//   console.log("display books")
//   axios
//     .get("http://localhost:3000/books",{headers:{"Authorization":`Bearer ${jwt}`}})
//     .then((res) => {

//       setBooks(res.data);
     
//     })

//     .catch((err) => console.log(err) );
// },[]);
return(
    <div >
     <ul className="[&>*:nth-child(1)] mt-20">{books.map((el)=><li key={el._id} ><Book title={el.title} id={el._id} cover={el.cover} description={el.description} author={el.author} style={{imgHeight:"h-74"}}/></li>)}</ul>
   
     </div>
)
}
