import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContex";
import { Book } from "../../../components/books/book";

function ShowBooks() {
  const { jwt } = useContext(userContext);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/books", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {books.map((el) => (
        <li key={el._id}>
          <Book
            title={el.title}
            id={el._id}
            cover={el.cover}
            description={el.description}
            author={el.author}
            style={{ imgHeight: "h-32" }}
          />
        </li>
      ))}
    </div>
  );
}

export { ShowBooks };
