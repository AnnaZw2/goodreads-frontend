import { Navbar } from "../../../components/navbar";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AdminForms.css"
import "./../../../index.css"
import { validationSchema } from "./Validate";
export function AdminForms() {
 
  
return (
  <div className="w-full" >
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
    onSubmit={(values, { setSubmitting, isValid, touched }) => {
        if (!isValid || !Object.keys(touched).length) {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
        }, 400);
        }
      
    }}
    >
  
    {({ isValid, touched }) => (
      
      <Form className=" flex justify-center  items-center mx-auto my-24 w-4/5" >
     { console.log("touched",Object.keys(touched).length)}
  <div className="container border rounded-sm pl-11 pr-11 border-light-gray bg-dark-beige">
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
        <Field name="serie" type="text" />
        <ErrorMessage name="serie" component="div" className="error" />
      </div>

      <div className="input-admin edition">
          <label>Name of edition:</label>
          <Field name="edition" type="text" />
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
        <Field name="publishing_date" type="text" />
        <ErrorMessage name="publishing_date" component="div" className="error" />
      </div>

      <div className="input-admin part-sereis">
        <label>Part of series:</label>
        <Field name="part_of_series" type="number"  />
        <ErrorMessage name="part_of_series" component="div" className="error" />
      </div>

      <div className="input-admin pages">
        <label>Number of pages:</label>
        <Field name="number_of_pages" type="number" />
        <ErrorMessage name="number_of_pages" component="div" className="error" />
      </div>

      <div className="input-admin url">
        <label>URL for cover image:</label>
        <Field name="cover" type="text" />
        <ErrorMessage name="cover" component="div" className="error" />
      </div>


      <div className="input-admin description">
        <label>Description:</label>
        <Field name="description" as="textarea" className="h-40 w-80" />
        <ErrorMessage name="description" component="div" className="error" />
      </div>

    <div className="button flex justify-center items-center">
    {console.log(Object.keys(touched).length==0)}
    {console.log(isValid)}

    <button type="submit" className="col-start-1 col-end-8" disabled={!isValid || !Object.keys(touched).length}
>Submit</button>

   
    </div>
  </div>



      </Form>
    )}
  </Formik>


   </div>
);
}
