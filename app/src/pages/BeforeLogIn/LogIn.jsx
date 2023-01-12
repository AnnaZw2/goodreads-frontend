import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import "./Register.css"
import axios from "axios"
import { useState } from "react"


export function LogIn() {

    const [invalidDataError,setInvalidDataError] =useState(false)

    const navigate = useNavigate();

    const onSubmit = (values) => {

        axios
            .post("http://localhost:3000/auth/login", {
                "email": values.email,
                "password": values.password
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(res => {
                console.log(res + ".....")
                localStorage.setItem("jwt", res.data.token)
                //  setJwt(res.data.token)

            }).then(() => { navigate("/") })

            .catch(err =>{ setInvalidDataError(true)})


    }


    const { values, handleBlur, handleChange, errors, touched, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        onSubmit
    })




    return (
        <div>
            <Link to="/sign" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Register</Link>
            <h3 className="header-3">Log In</h3>

            <form className="p-3 bg-light-beige flex flex-col items-center justify-start h-screen  gap-3 w-screen" onSubmit={handleSubmit}  >
{invalidDataError ? <p className="errors">Invalid email or password!</p> : null}
                <div className="input-field">
                    <label htmlFor="email">Email </label>
                    <input
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? "input-errors" : ""}
                    />
                    {errors.email && touched.email ? <p className="errors"> {errors.email}</p> : null}

                </div>



                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        type="password"
                        onBlur={handleBlur}
                        className={errors.password ? "input-errors" : ""}
                    />
                    {errors.password && touched.password ? <p className="errors"> {errors.password}</p> : null}
                </div>


                <button className="bg-white border" type="submit"  >Submit</button>

            </form>
        </div>


    )
}
