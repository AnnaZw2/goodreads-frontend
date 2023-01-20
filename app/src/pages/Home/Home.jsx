import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { DisplayBooks } from "../../components/books/displayBooks";
import { Navbar } from "../../components/navbar";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    {
      localStorage.getItem("jwt") == null ? navigate("/login") : null;
    }
  }, []);

  return (
    <div className="min-w-screen">
      <Navbar />
      <DisplayBooks />
    </div>
  );
}
