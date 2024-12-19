import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../../context/userContex";
import jwt_decode from "jwt-decode";
import { SubmitButton } from "./SubmitButton";

export function LogIn() {
  const [invalidDataError, setInvalidDataError] = useState(false);
  const { user, setUpdateUser } = useContext(userContext);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios
      .post(
        "http://localhost:3000/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        const decode = jwt_decode(res.data.token).user;
        localStorage.setItem("decoded", JSON.stringify(decode));
      })
      .then(() => {
        setUpdateUser(JSON.parse(localStorage.getItem("decoded")));
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setInvalidDataError(true);
      });
  };

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
    });

  return (
    <div className="center">
      <h2 className="header-2 text-color-dark-brown mb-8">Log In</h2>

      <form
        className="log-in-form w-full max-w-md p-8   border border-gray-300"
        onSubmit={handleSubmit}
      >
        {invalidDataError ? (
          <p className="errors mb-4">Invalid email or password!</p>
        ) : null}
        <div className="input-field mb-4">
          <label htmlFor="email">Email</label>
          <input
            value={values.email.trim(" ")}
            onChange={handleChange}
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            onBlur={handleBlur}
            className={`p-4  input ${
              errors.email && touched.email ? "input-errors" : ""
            }`}
          />
          {errors.email && touched.email ? (
            <p className="errors mt-2">{errors.email}</p>
          ) : null}
        </div>

        <div className="input-field mb-4">
          <label htmlFor="password">Password</label>
          <input
            value={values.password.trim(" ")}
            onChange={handleChange}
            id="password"
            type="password"
            autoComplete="current-password"
            onBlur={handleBlur}
            className={`p-4 input ${errors.password ? "input-errors" : ""}`}
          />
          {errors.password && touched.password ? (
            <p className="errors mt-2">{errors.password}</p>
          ) : null}
        </div>

        <SubmitButton />
      </form>

      <div className="register-text ">
        <p>Are you a new member?</p>
        <Link to="/register" className="register-button">
          Register
        </Link>
      </div>
    </div>
  );
}
