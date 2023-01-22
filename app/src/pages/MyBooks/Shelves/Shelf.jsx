import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/navbar";
import { NavigateMyBooks } from "../navigateMyBooks";
import axios from "axios";
import { userContext } from "../../../context/userContex";
export function Shelf() {
  const { name, id } = useParams();

  const { jwt } = useContext(userContext);
  const [booksId, setBooksId] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks([])

    axios
      .get(`http://localhost:3000/book-details/shelves/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        console.log("i got this many books from shelf",res.data)
        const arr = res.data.map((el) => el.book_id);
        console.log("arr", arr);

        console.log("display books on this shel res data", res.data);

        return arr;
      })
      .then((arr) => {
        if (arr.length != 0) {
          console.log("books ids to be displayed", arr);

          const requests = arr.map((id) =>
            axios.get(`http://localhost:3000/books/${id}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
          );

          Promise.all(requests)
            .then((responses) => {
              const booksData = responses.map((res) => res.data);
              setBooks(booksData);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("books",books)

  return (
    <div>
      <Navbar />
      <NavigateMyBooks />

      <h3 className="header-3">{name}</h3>

      {books.length!=0 ? books.map(el =><img key={el._id} src={el.cover}></img> ) : null}
    </div>
  );
}
