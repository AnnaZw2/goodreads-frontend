
import {NavigateMyBooks} from "./../navigateMyBooks"
import { Navbar } from "../../../components/navbar"
import { useContext, useEffect,useState } from "react"
import axios from "axios"
import { userContext } from "../../../context/userContex"
import { MyBooks } from "../MyBooks"
export function All() {
    const [books, setBooks] = useState([]);
const {jwt} = useContext(userContext)

useEffect(() => {
    axios.get("http://localhost:3000/book-details", { headers: { Authorization: `Bearer ${jwt}` }, })
      .then((res) => res.data)
      .then((res) => (res.map(el => el.book_id)))
      .then((booksIds) => {
        const arr = booksIds.map(el => axios.get(`http://localhost:3000/books/${el}`, { headers: { Authorization: `Bearer ${jwt}` }, })
          .then(res => res.data)
          .catch(err => console.log(err)));

        Promise.all(arr)
          .then(resolvedData => setBooks(resolvedData))
          .catch(err => console.log(err));
      }).catch(err => console.log(err));
      console.log(books)
  }, []);
    return (
    <MyBooks books={books} shelfName={"All"} setBooks={setBooks}/>
    )
}