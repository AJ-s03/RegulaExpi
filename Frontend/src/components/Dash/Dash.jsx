import DashStyles from "./Dash.module.css"

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SetExpenses from "../../pages/Dashboard/Dashpages/SetExpenses _CRUD/SetExpenses";
import SeeExpenses from "../../pages/Dashboard/Dashpages/SetExpenses _CRUD/CheckExpenses";
import Payment from "../../pages/Dashboard/Dashpages/Payment_Method/Payment";
import Analytics from "../../pages/Dashboard/Dashpages/Analytics/Analytics.jsx";
import Settings from "../../pages/Dashboard/Dashpages/Settings/Settings.jsx";
import Feedback from "../../pages/Dashboard/Dashpages/Feedback/Feedback.jsx";
import Stock from "../../pages/Dashboard/Dashpages/Stock/Stock.jsx";
import Logout from '../../pages/Logout.jsx';

function Dashboard(props) {

    const navigate = useNavigate();

    const handleSetExpenses = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/SetExpenses", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/SetExpenses");
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handlePayment = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Payment", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/Payment", {state: result.data});
                else
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleStock = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Stock", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/Stock", {state: result.data});
                else
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleAnalytics = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Analytics", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/Analytics", {state: result.data} );
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleFeedback = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Feedback", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/Feedback", {state: result.data});
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleLogout = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Logout", { withCredentials: true })
            .then(result => {
                if (result.data){
                    console.log("logged out succesfully");
                    navigate("/logout");
                }
                else 
                    navigate("/Sign_up");
               
            })
            .catch(err => console.log(err));
    };



    return (
        <>
            <div className={DashStyles.Dashboard}>
                <div className={DashStyles.Dash}>
                    <div>
                        <ul className={DashStyles.Dash_ul}>
                            <li className={DashStyles.Dash_ul_li} >
                                <Link to="/SetExpenses" style={{ textDecoration: 'none', color: 'white' }} onClick={handleSetExpenses} >Set Expenses</Link>
                            </li>

                            <li className={DashStyles.Dash_ul_li}>
                                <Link to="/Payment" style={{ textDecoration: 'none', color: 'white' }} onClick={handlePayment} >Payment</Link>
                            </li>
                            <li className={DashStyles.Dash_ul_li}>
                                <Link to="/Analytics" style={{ textDecoration: 'none', color: 'white' }} onClick={handleAnalytics} >Analytics</Link>
                            </li>
                            <li className={DashStyles.Dash_ul_li}>
                                <Link to="/Stock" style={{ textDecoration: 'none', color: 'white' }} onClick={handleStock} >Stock</Link>
                            </li>

                        </ul>
                    </div>
                    <hr />
                    <div>
                        <ul className={DashStyles.Dash_ul}>
                            <li className={DashStyles.Dash_ul_li}>
                                <Link to="/Feedback" style={{ textDecoration: 'none', color: 'white' }} onClick={handleFeedback} >Feedbacks</Link>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <ul className={DashStyles.Dash_ul}>
                            <li className={DashStyles.Dash_ul_li}>
                                <Link to="/Logout" style={{ textDecoration: 'none', color: 'white' }} onClick={handleLogout} >Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <Routes>
                        <Route path="/SetExpenses" element={<SetExpenses />} />
                        <Route path="/SeeExpenses" element={<SeeExpenses />} />
                        <Route path="/Payment" element={<Payment />} />
                        <Route path="/Analytics" element={<Analytics />} />
                        <Route path="/Stock" element={<Stock />} />
                        <Route path='/Settings' element={<Settings />}/>
                        <Route path='/Feedback' element={<Feedback />}/>
                        <Route path='/Logout' element={<Logout />}/>
                    </Routes> */}
            </div>
        </>
    )

}

export default Dashboard