// src/Login.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from 'axios';
import { useNavigate } from "react-router-dom";

import SignupStyles from "./Sign_up.module.css"
import Home from "./Home";

function Login() {
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const navigate = useNavigate();
 
    const handleSubmit = (e) => {
   
        const username = document.getElementById("usernameauth").value;
        const password = document.getElementById("passwordauth").value;
        e.preventDefault();
        axios.post("http://localhost:3000/api/Login", { username, password }, {withCredentials: true})
            .then(result => {
                if(result.data.session)
                    navigate("/Home");
                 else 
                    document.getElementById("Message").textContent = "Bad credentials";
                
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div style={{ display: "grid", justifyContent: "center" }} >
                <div><h5 style={{ color: 'black', fontFamily: 'Courier New' }} id="Message"></h5>
                </div>

            </div>
            <div className={SignupStyles.Page}>


                <h1>Login</h1>

                <br />

                <form onSubmit={handleSubmit} class={SignupStyles.form} method="post">
                    <div className={SignupStyles.Main} >
                        <div class={SignupStyles.form_group}>


                            <div className={SignupStyles.Smallmain} >

                                Username

                                <br />
                                <input type="text" id="usernameauth" />
                            </div>
                            <br />
                            <div className={SignupStyles.Smallmain} >


                                Password
                                <br />
                                <input type="password" id="passwordauth" />

                            </div>


                            <br />
                           
                        </div>
                        <div className={SignupStyles.Smallmain} >
                                <input className={SignupStyles.Back} type="submit" value="Login" />
                        </div>
                    </div>

                </form>
                <br />


            </div>

            <div style={{ display: "grid", justifyContent: "center" }} >
                <div>
                    <p>Don't have an account?</p>
                    <Link to="/Sign_up" style={{ textDecoration: 'none' }} >
                        Sign Up
                    </Link>
                    
                </div>
                <br />
            </div>



        </>
    );
}

export default Login;