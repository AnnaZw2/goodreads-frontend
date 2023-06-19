import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/userContex";
import { Navbar } from "../components/navbar";
// import { CommentsSection } from "../components/Comments/CommentsSection"
import { UpdateButton } from "../components/UpdateButton/UpdateButton";
import { Comments } from "../components/Comments/Comments";
import { updateContext } from "../context/updateContext";



function Details() {
  const { id } = useParams();
  const { jwt } = useContext(userContext);
  const [details, setDetails] = useState();
  const { user } = useContext(userContext);
  const {update, setupdate} = useContext(updateContext)

  useEffect(() => {
    
    axios
      .get(`http://localhost:3000/books/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setDetails(res.data);
    
        setupdate(false)

      })
      .catch((err) => console.log(err));
  }, [update]);


console.log(user)
  return (
    <div>
      <Navbar />
      {!details ? null : (
        <div className="flex mr-64 ml-64  mt-10 items-start">
          <img src={details.cover} className="h-80 mr-4 mt-5 "></img>
          {user.realm_access.roles.includes("admin")  ? (
            <UpdateButton
              className="m-1"
              textButton={
                <i className="fa-solid fa-pen-to-square text-base text-green"></i>
              }
              textModal={
                <p>
                  Are you sure you want to change cover of{" "}
                  <strong>{details.title}</strong>?
                </p>
              }
              placeholder="Enter url of new cover "
              id={details._id}
              patchKey={"cover"}
              url={`http://localhost:3000/books/${details._id}`}
            />
          ) : null}

          <div className="flex flex-col justify-start items-start">
            <div className="p-4 border-b">
              <h4 className="header-4  ">
                <div className="flex justify-center items-center gap-3">
                  <strong>{details.title}</strong>
                  {user.realm_access.roles.includes("admin")  ? (
                    <UpdateButton
                      className="m-1 "
                      textButton={
                        <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                      }
                      textModal={
                        <p>
                          Are you sure you want to change title of{" "}
                          <strong>{details.title}</strong>?
                        </p>
                      }
                      placeholder="Enter new title "
                      id={details._id}
                      patchKey={"title"}
                      url={`http://localhost:3000/books/${details._id}`}
                    />
                  ) : null}
                </div>{" "}
              </h4>

              <div>
                <div className="flex flex-row justify-center gap-2">
                  ({details.serie}
                  {user.realm_access.roles.includes("admin")  ? (
                    <UpdateButton
                      className="m-1 "
                      textButton={
                        <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                      }
                      textModal={
                        <p>
                          Are you sure you want to change name of the series of{" "}
                          <strong>{details.title}</strong>?
                        </p>
                      }
                      placeholder="Enter new title "
                      id={details._id}
                      patchKey={"serie"}
                      url={`http://localhost:3000/books/${details._id}`}
                    />
                  ) : null}
                  #{details.part_of_series}{" "}
                  {user.realm_access.roles.includes("admin")  ? (
                    <UpdateButton
                      className="m-1 "
                      textButton={
                        <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                      }
                      textModal={
                        <p>
                          Are you sure you want to change which book in the
                          serie is <strong>{details.title}</strong>?
                        </p>
                      }
                      placeholder="Enter new part of the serie number"
                      id={details._id}
                      patchKey={"part_of_series"}
                      url={`http://localhost:3000/books/${details._id}`}
                    />
                  ) : null}{" "}
                  )
                </div>
              </div>

              <div className="text-xl mb-10 flex justify-center gap-3">
                by {details.author}{" "}

                {user.realm_access.roles.includes("admin") ? (
                  <UpdateButton
                    className="m-1 "
                    textButton={
                      <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change name of the author of{" "}
                        <strong>{details.title}</strong>?
                      </p>
                    }
                    placeholder="Enter new title "
                    id={details._id}
                    patchKey={"author"}
                    url={`http://localhost:3000/books/${details._id}`}
                  />
                ) : null}
              </div>


              <div>
                <p className="ml-10 mr-10">{details.description}

                </p>
                {user.realm_access.roles.includes("admin")  ? (
                  <UpdateButton
                    className="m-1 "
                    style={{ height: "h-64", width: "w-96" }}
                    textButton={
                      <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change description of{" "}
                        <strong>{details.title}</strong>?
                      </p>
                    }
                    placeholder="Enter new description "
                    id={details._id}
                    patchKey={"description"}
                    url={`http://localhost:3000/books/${details._id}`}
                  />
                ) : null}
              </div>
            </div>

            <div className="flex  flex-col  ml-10 items-start justify-start mt-4">
              <div className="flex gap-2">
                <p>
                  <strong>Pages:</strong> {details.pages}
                </p>
                {user.realm_access.roles.includes("admin")  ? (
                  <UpdateButton
                    className="m-1 "
                    textButton={
                      <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change nuber of pages of{" "}
                        <strong>{details.title}</strong>?
                      </p>
                    }
                    placeholder="Enter new description "
                    id={details._id}
                    patchKey={"pages"}
                    url={`http://localhost:3000/books/${details._id}`}
                  />
                ) : null}
              </div>

              <div className="flex gap-2">
                <p>
                  <strong>Edition:</strong>
                  {details.edition}
                </p>
                {user.realm_access.roles.includes("admin")  ? (
                  <UpdateButton
                    className="m-1 "
                    textButton={
                      <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change name of edition of{" "}
                        <strong>{details.title}</strong>?
                      </p>
                    }
                    placeholder="Enter new description "
                    id={details._id}
                    patchKey={"edition"}
                    url={`http://localhost:3000/books/${details._id}`}
                  />
                ) : null}
              </div>

              <div className="flex gap-2">
                <p>
                  <strong>Publisher:</strong>
                  {details.publisher}
                </p>
                {user.realm_access.roles.includes("admin") ? (
                  <UpdateButton
                    className="m-1 "
                    textButton={
                      <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change name of publisher of{" "}
                        <strong>{details.title}</strong>?
                      </p>
                    }
                    placeholder="Enter new description "
                    id={details._id}
                    patchKey={"edition"}
                    url={`http://localhost:3000/books/${details._id}`}
                  />
                ) : null}

              </div>

              <div className="flex gap-2">
                <p>
                  <strong>Publishing date: </strong>
                  {details.publishing_date
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")
                    .replace("- ", "-")}
                </p>
                {user.realm_access.roles.includes("admin")  ? (
                  <UpdateButton
                    className="m-1 "
                    textButton={
                      <i className="fa-solid fa-pen-to-square text-base text-green"></i>
                    }
                    textModal={
                      <p>
                        Are you sure you want to change publishing date of{" "}
                        <strong>{details.title}</strong>?
                      </p>
                    }
                    placeholder="Enter new description "
                    id={details._id}
                    patchKey={"publishing_date"}
                    url={`http://localhost:3000/books/${details._id}`}
                  />
                ) : null}
              </div>

            </div>
          </div>
        </div>
      )}
      {/* <CommentsSection/>  with mock comments in redux*/}
      <Comments bookId={id} />
    </div>
  );
}

export { Details };
