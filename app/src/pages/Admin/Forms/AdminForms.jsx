import { Navbar } from "../../../components/navbar";
import React, { useContext, useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,

} from "formik";

import "./AdminForms.css";
import "./../../../index.css";
import { validationSchema } from "./Validate";
import axios from "axios";
import { userContext } from "../../../context/userContex";
import { GoBack } from "../GoBackButton";

export function AdminForms() {
  const [added, setAdded] = useState("");

  const { jwt } = useContext(userContext);
  useEffect(() => {
    setTimeout(() => {
      setAdded("");
    }, 3000);
  }, [added]);
  return (
    <div className="w-full">
      <Navbar />
      <Formik
        initialValues={{
          title: "",
          author: "",
          description: "",
          part_of_series: "",
          edition: "",
          number_of_pages: "",
          cover: "",
          serie: "",
          publisher: "",
          publishing_date: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, isValid, touched, resetForm }) => {
          if (!isValid || !Object.keys(touched).length) {
         
         
            axios
              .post("http://localhost:3000/books", values, {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  "Content-Type": "application/json",
                },
              })
              .then((res) => console.log(res))
              .then(() => setSubmitting(false))
              .then(() => setAdded("Book was sucesfully added!"))
              .then(() => {
                resetForm();
              })
              .catch((err) => console.log(err));
          }else{
            setAdded("Please fill all fields! Empty fields are not allowed!")
          }
          }
        }
      >
        {({ isValid, touched }) => (
          <Form className=" flex justify-center  items-center mx-auto my-24 w-4/5">
            <div className="container border rounded-sm pl-11 pr-11 border-light-gray bg-dark-beige">
              <div className="header flex justify-center items-center flex-col ">
                {added.length != 0 ? <p>{added}</p> : null}

                <div className="flex flex-row items-center align-middle ">
                  <h3 className="header-3">Add new book</h3>
                  <GoBack />
                </div>
              </div>
              <div className="input-admin title">
                <label>Title:</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              <div className="input-admin author">
                <label>Author:</label>
                <Field name="author" type="text" />
                <ErrorMessage name="author" component="div" className="error" />
              </div>

              <div className="input-admin name-series">
                <label>Name of series:</label>
                <Field name="serie" type="text" />
                <ErrorMessage name="serie" component="div" className="error" />
              </div>

              <div className="input-admin edition">
                <label>Name of edition:</label>
                <Field name="edition" type="text" />
                <ErrorMessage
                  name="edition"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-admin publisher">
                <label>Publisher:</label>
                <Field name="publisher" type="text" />
                <ErrorMessage
                  name="publisher"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-admin publishin-date">
                <label>Publishing date:</label>
                <Field name="publishing_date" type="text" />
                <ErrorMessage
                  name="publishing_date"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-admin part-sereis">
                <label>Part of series:</label>
                <Field name="part_of_series" type="number" />
                <ErrorMessage
                  name="part_of_series"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-admin pages">
                <label>Number of pages:</label>
                <Field name="number_of_pages" type="number" />
                <ErrorMessage
                  name="number_of_pages"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-admin url">
                <label>URL for cover image:</label>
                <Field name="cover" type="text" />
                <ErrorMessage name="cover" component="div" className="error" />
              </div>

              <div className="input-admin description">
                <label>Description:</label>
                <Field name="description" as="textarea" className="h-40 w-80" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>

              <div className="button flex justify-center items-center">
                <button
                  type="submit"
                  className="col-start-1 col-end-8"
                  disabled={!isValid || !Object.keys(touched).length}
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
