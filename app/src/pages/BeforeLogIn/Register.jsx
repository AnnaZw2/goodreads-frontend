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
    <div className="center">
      <h2 className="header-2">Register</h2>

      <form
        className="log-in-form w-full max-w-md p-8   border border-gray-300"
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
            className={`input p-2
              "" + (errors.email && touched.email) ||
              invalidRegistrationError == "email already exists"
                ? "input-errors"
                : ""
            `}
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
            className={`input p-2
              errors.nickName && touched.nickName ? "input-errors" : ""
            `}
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
            className={`input p-2
              errors.password && touched.password ? "input-errors" : ""
            `}
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
            className={`input p-2
              errors.confirmPassword && touched.confirmPassword
                ? "input-errors"
                : ""
            `}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="errors"> {errors.confirmPassword}</p>
          ) : null}
        </div>
        <SubmitButton />
      </form>
      <div className="register-text">
        <p>Do you already have an account?</p>
        <Link to="/login" className="register-button">
          Log in
        </Link>
      </div>
    </div>
  );
}
