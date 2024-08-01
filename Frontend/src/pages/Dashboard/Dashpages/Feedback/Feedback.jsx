import { useNavigate, useLocation } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackStyles from "./Feedback.module.css"
import Dash from "../../../../components/Dash/Dash"
import DashStyles from "../../../../components/Dash/Dash.module.css"
import axios from "axios";


function Feedback(props) {


    let navigate = useNavigate()
    let location = useLocation()
    const feeds = location.state.data;

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
    }

    const handleBack = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 100);
        navigate(-1)
    }

    const handleAddFeed = (e) => {
        e.preventDefault();
        const feed = document.getElementById("feed").value;
        axios.post("https://regulaexpi-backend.onrender.com/api/Login/AddFeed", { feed }, { withCredentials: true }).then(result => {

            document.getElementById("Message").textContent = result.data;

        });
    }





    return (
        <>
            <div className={FeedbackStyles.Page}>
                <div className={FeedbackStyles.DashAside}>
                    {/* <Dashboard /> */}
                    <Dash />
                </div>
                <div className={FeedbackStyles.Main} >
                    <div className={FeedbackStyles.Main} style={{ backgroundColor: "white" }} >
                        <button className={DashStyles.Dash_ul_li} onClick={handleBack} style={{ width: '10vw', marginTop: '0', right: '0%', color: 'black' }}>
                            Back
                        </button>
                        <h1>Feedback</h1>
                        <p>Add feedback <small>(completely anonymous)</small></p>
                        <form class={FeedbackStyles.form} onSubmit={handleAddFeed} method="POST">
                            <textarea id="feed" className={FeedbackStyles.Textarea}></textarea>
                            <div >
                                <button className={DashStyles.Dash_ul_li} style={{ color: "black", width: "50%" }} type="submit" onClick={handleClick} >Add</button>
                            </div>
                        </form>
                        <div>
                            <h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                        </div>

                    </div>
                    <br />
                    <p>Some feedbacks: </p>
                    <div className={FeedbackStyles.Main} id="feedbox" style={{ backgroundColor: "white" }} >
                        {feeds.map((string, index) => (
                            <p key={index}>{string}</p>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Feedback
