import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../../context/userContex";
import { MyBooks } from "../MyBooks";
export function All() {
  const [books, setBooks] = useState([]);
  const { jwt } = useContext(userContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/book-details", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => res.data)
      .then((res) => {
        const tmp = res.filter((el) => el.shelves.length != 0);
        return tmp.map((el) => el.book_id);
      })
      .then((booksIds) => {
        const arr = booksIds.map((el) =>
          axios
            .get(`http://localhost:3000/books/${el}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((res) => res.data)
            .catch((err) => console.log(err))
        );

        Promise.all(arr)
          .then((resolvedData) => setBooks(resolvedData))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return <MyBooks books={books} shelfName={"All"} setBooks={setBooks} />;
}
