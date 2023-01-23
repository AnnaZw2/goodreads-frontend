import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/navbar";
import { NavigateMyBooks } from "../navigateMyBooks";
import axios from "axios";
import { userContext } from "../../../context/userContex";
import { updateShelfContext } from "../../../context/updateShelfContext";
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
  }, [updateShelves]);

  console.log("books",books)

  return (
<div className="flex flex-col h-screen">
  <Navbar className="w-full" />
  <div className="flex">
    <NavigateMyBooks  />
    <div className="flex flex-col items-start justify-between w-full ml-12">
      <h3 className="header-3 flex  justify-center text-center">{shelfName}</h3>
      <div className="flex flex-col items-center">
        {books.length !== 0 ? books.map(el => <img key={el._id} src={el.cover} className="my-1 h-48" ></img>) : null}
      </div>
    </div>
  </div>
</div>
  
  );
}
