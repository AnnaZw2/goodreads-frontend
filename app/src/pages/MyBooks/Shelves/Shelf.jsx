import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/navbar";
import { NavigateMyBooks } from "../navigateMyBooks";
import axios from "axios";
import { userContext } from "../../../context/userContex";
import { updateShelfContext } from "../../../context/updateShelfContext";
import { MyBooks } from "../MyBooks";
export function Shelf() {
  const { name, id } = useParams();

  const { jwt } = useContext(userContext);
  const { updateShelves, setUpdateShelves } = useContext(updateShelfContext);
  const [books, setBooks] = useState([]);
 const shelfName = name.replaceAll("-"," ")

  useEffect(() => {
    setBooks([])

    axios
      .get(`http://localhost:3000/book-details/shelves/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
      
        const arr = res.data.map((el) => el.book_id);
      
        return arr;
      })
      .then((arr) => {
        if (arr.length != 0) {
         

          const requests = arr.map((id) =>
            axios.get(`http://localhost:3000/books/${id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
          );

          Promise.all(requests)
            .then((responses) => {
              const booksData = responses.map((res) => res.data);
              setBooks(booksData);
              setUpdateShelves(false)
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, [updateShelves,id]);

  console.log("books",books)

  return (
<MyBooks books={books} shelfName={shelfName}/>

  
  );
}
