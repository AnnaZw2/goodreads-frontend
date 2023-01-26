import { Navbar } from "../components/navbar";
import { useContext } from "react";
import { searchShelfContext } from "../context/searchContext";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContex";
import { DeleteButton } from "../components/deleteButton";
import axios from "axios";

export function Explore() {
  const { searchValue, searchOutput } = useContext(searchShelfContext);
  const { user, jwt } = useContext(userContext);

  console.log("lllklklk", searchOutput);
  return (
    <div>
      <Navbar />
      <div className="mr-24 ml-24 mt-10">
        <ul className="flex flex-wrap ">
          {searchOutput.length !== 0
            ? searchOutput.map((el) => (
                <li key={el._id} className="w-1/4 p-4">
                  {user.role == "admin" ? (
                    <div className="flex justify-end mr-5">
                      <DeleteButton
                        textModal={
                          <p>
                            Are you sure you want to delete{" "}
                            <strong>{el.title}</strong>?
                          </p>
                        }
                        textButton={
                            <i className="fa-regular text-black fa-trash-can text-sm"></i>
                        }
                        request={() =>
                          axios
                            .delete(`http://localhost:3000/books/${el._id}`, {
                              headers: { Authorization: `Bearer ${jwt}` },
                            })
                            .catch((err) => console.log(err))
                        }
                      />

                    </div>
                  ) : null}
                  <Link className="links" to={`/details/${el._id}`}>
                    <img className="w-full  " src={el.cover} alt={el.title} />
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}