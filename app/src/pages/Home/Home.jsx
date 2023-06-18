import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayBooks } from "../../components/books/displayBooks";
import { Navbar } from "../../components/navbar";
import { userContext } from "../../context/userContex";
import axios from "axios"

export function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const {jwt} = useContext(userContext)

  // useEffect(() => {
  //   {
  //     user == null ? navigate("/login") : null;
  //   }
  // }, []);

  useEffect(() => {

    axios
      .get("http://localhost:3000/books",{headers:{"Authorization":`Bearer ${jwt}`}})
      .then((res) => {
  
        setBooks(res.data);
       
      })
  
      .catch((err) => console.log(err) );
  },[]);

  return (
    <div className="min-w-screen">
      <Navbar />
      {books!=undefined ?
      <DisplayBooks books={books} /> : null}
    </div>
  );
}
