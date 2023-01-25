import { Navbar } from "../../components/navbar";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AdminForms.css"
import "./../../index.css"

export function AdminForms() {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        author: Yup.string().required("Author is required"),
        description: Yup.string().required("Description is required"),
        partOfSeries: Yup.number()
          .required("Part of series is required")
          .positive("Part of series must be a positive number"),
        edition: Yup.number()
          .required("Edition is required")
          .positive("Edition must be a positive number"),
        numberOfPages: Yup.number()
          .required("Number of pages is required")
          .positive("Number of pages must be a positive number"),
        urlForCoverImage: Yup.string().required("URL for cover image is required"),
        nameOfSeries: Yup.string().required("Name of series is required"),
        publisher: Yup.string().required("Publisher is required"),
        publishingDate: Yup.string().required("Publishing date is required"),
      });
    
  return (
    <div className="w-full" >
      <Navbar />
      <Formik
      initialValues={{
        title: "",
        author: "",
        description: "",
        partOfSeries: "",
        edition: "",
        numberOfPages: "",
        urlForCoverImage: "",
        nameOfSeries: "",
        publisher: "",
        publishingDate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
    
      {({ errors, touched }) => (
        <Form className=" bg-dark-beige flex justify-center  items-center  ml-56 border rounded-sm border-light-gray mr-56 pl-11 pr-11 mt-24" >
      
    <div className="container">
   <div className="header flex justify-center items-center ">
   <h3 className="header-3">Add new book</h3>
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
          <Field name="nameOfSeries" type="text" />
          <ErrorMessage name="nameOfSeries" component="div" className="error" />
        </div>

        <div className="input-admin edition">
            <label>Edition:</label>
            <Field name="edition" type="number" />
            <ErrorMessage name="edition" component="div" className="error" />
          </div>

          <div className="input-admin publisher">
            <label>Publisher:</label>
            <Field name="publisher" type="text" />
            <ErrorMessage name="publisher" component="
div" className="error" />
        </div>

        <div className="input-admin publishin-date">
          <label>Publishing date:</label>
          <Field name="publishingDate" type="text" />
          <ErrorMessage name="publishingDate" component="div" className="error" />
        </div>

        <div className="input-admin part-sereis">
          <label>Part of series:</label>
          <Field name="partOfSeries" type="number"  />
          <ErrorMessage name="partOfSeries" component="div" className="error" />
        </div>

        <div className="input-admin pages">
          <label>Number of pages:</label>
          <Field name="numberOfPages" type="number" />
          <ErrorMessage name="numberOfPages" component="div" className="error" />
        </div>

        <div className="input-admin url">
          <label>URL for cover image:</label>
          <Field name="urlForCoverImage" type="text" />
          <ErrorMessage name="urlForCoverImage" component="div" className="error" />
        </div>

  
        <div className="input-admin description">
          <label>Description:</label>
          <Field name="description" as="textarea" className="h-40" />
          <ErrorMessage name="description" component="div" className="error" />
        </div>

      <div className="button">
      <button type="submit" className="col-start-1 col-end-8">Submit</button>
      </div>
    </div>



        </Form>
      )}
    </Formik>


     </div>
  );
}
