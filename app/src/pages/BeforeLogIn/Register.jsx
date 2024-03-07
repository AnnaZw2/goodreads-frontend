import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import "./Register.css";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

export function Register() {
  const validate = yup.object().shape({
    email: yup.string().email("Enter a valid email!").required("Required!"),
    nickName: yup
      .string()
      .min(3, "Must be min 3 characters!")
      .required("Required!"),
    password: yup
      .string()
      .min(8, "Must be min 8 characters!")
      .required("Required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must be the same!")
      .required("Required!"),
  });

  const navigate = useNavigate();
  const [invalidRegistrationError, setInvalidRegistrationError] = useState("");

  const onSubmit = (values) => {
    if (
      values.email.trim().length != 0 &&
      values.password.trim().length != 0 &&
      values.nickName.trim().length != 0
    ) {
      axios
        .post(
          "http://localhost:3000/auth/signup",
          {
            email: values.email,
            username: values.nickName,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => console.log(res))
        .then(() => navigate("/login"))
        .catch((res) => {
          console.log(res.response.data);
        });
    } else {
      setInvalidRegistrationError(
        "Please fill all the fields with valid data! Empty fields are not allowed!"
      );
    }
  };

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: validate,
      onSubmit,
    });

  return (
    <div className="h-full">
      <Link
        to="/login"
        className=" text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown"
      >
        Log in
      </Link>
      <h3 className="header-3">Register</h3>

      <form
        className="p-3 bg-light-beige flex flex-col items-center justify-start h-screen  gap-3 w-screen"
        onSubmit={handleSubmit}
      >
        {invalidRegistrationError.length != 0 ? (
          <p className="errors">{invalidRegistrationError}</p>
        ) : null}
        <div className="input-field">
          <label htmlFor="email">Email </label>
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            autoComplete="email"
            onBlur={handleBlur}
            className={
              (errors.email && touched.email) ||
              invalidRegistrationError == "email already exists"
                ? "input-errors"
                : ""
            }
          />
          {errors.email && touched.email ? (
            <p className="errors"> {errors.email}</p>
          ) : null}
          {invalidRegistrationError == "email already exists" ? (
            <p className="errors">Email already exists!</p>
          ) : null}
        </div>

        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input
            value={values.nickName}
            onChange={handleChange}
            id="nickName"
            name="nickName"
            type="text"
            autoComplete="username"
            onBlur={handleBlur}
            className={
              errors.nickName && touched.nickName ? "input-errors" : ""
            }
          />
          {errors.nickName && touched.nickName ? (
            <p className="errors"> {errors.nickName}</p>
          ) : null}
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            id="password"
            type="password"
            onBlur={handleBlur}
            autoComplete="new-password"
            className={
              errors.password && touched.password ? "input-errors" : ""
            }
          />
          {errors.password && touched.password ? (
            <p className="errors"> {errors.password}</p>
          ) : null}
        </div>

        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-errors"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="errors"> {errors.confirmPassword}</p>
          ) : null}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
