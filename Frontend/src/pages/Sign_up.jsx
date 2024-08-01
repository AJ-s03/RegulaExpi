import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import App from "../App.jsx";
// import NavBar from "../components/NavBar/NavBar.jsx";
import Login from "./Login.jsx";
import SignupStyles from "./Sign_up.module.css"





function Sign_up() {


    const navigate = useNavigate();



    const handleSubmit = (e) => {
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const cpassword = document.getElementById("cpassword").value;
        e.preventDefault();
        axios.post('https://regulaexpi-backend.onrender.com/api/Signup', { email, username, password, cpassword },{withCredentials: true})
            .then(result => {
                if (result.data === 'login')
                    navigate('/login');
                else {
                    document.getElementById("Message").textContent = result.data;
                }

            })
            .catch(err => console.log(err)
        );
    };

    return (

        <>

            <div style={{ display: "grid", justifyContent: "center" }} >
                <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                </div>

            </div>

            <div className={SignupStyles.Page}>

                <h1>Sign-up</h1>

                <br />

                <form onSubmit={handleSubmit} class={SignupStyles.form} method="post">
                    <div className={SignupStyles.Main} >
                        <div class={SignupStyles.form_group}>

                            <div className={SignupStyles.Smallmain} >

                                Email

                                <br />
                                <input type="email" id="email"/>
                            </div>
                            <br />
                            <div className={SignupStyles.Smallmain} >

                                Username

                                <br />
                                <input type="text" id="username" />
                            </div>
                            <br />
                            <div className={SignupStyles.Smallmain} >


                                Password
                                <br />
                                <input type="password" id="password" />

                            </div>
                            <br />
                            <div className={SignupStyles.Smallmain} >

                                Confirm password

                                <br />
                                <input type="password" id="cpassword" />

                            </div>


                        </div>
                        <br />
                        <div className={SignupStyles.Smallmain} >
                            <input className={SignupStyles.Back} type="submit" />
                        </div>
                    </div>

                </form>
                <br />


            </div>

            <div style={{ display: "grid", justifyContent: "center" }} >
                <div>
                    <p>Already have an account?</p>
                    <Link to="/Login" style={{ textDecoration: 'none' }} >
                        Login
                    </Link>
                </div>
                <br />
            </div>
        </>

    );
}

export default Sign_up;
