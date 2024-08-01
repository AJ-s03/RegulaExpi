import { useNavigate, useLocation } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnalyticsStyles from "./Analytics.module.css"
import Dash from "../../../../components/Dash/Dash"
import DashStyles from "../../../../components/Dash/Dash.module.css"
import { GoogleCharts } from 'google-charts';
import axios from "axios";

function Analytics(props) {


    let navigate = useNavigate();
    let location = useLocation();
    const handleBack = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 100);
        navigate(-1)
    };

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
    }


    const makeChart = (e) => {
        e.preventDefault();
        try {
            if (location.state.session) {
                const user = location.state.user;

                axios.post("http://localhost:3000/api/Login/Chart", { user }, { withCredentials: true })
                    .then(result => {

                        if (typeof (result.data) == "string")
                            document.getElementById("Message").textContent = result.data;

                        else {
                            const drawChart = () => {
                                const data = GoogleCharts.api.visualization.arrayToDataTable(result.data);

                                const pie_1_options = {
                                    chartArea: {
                                        left: 0,
                                        top: 0,
                                        width: '100%',
                                        height: '80%',
                                        borderRadius: "10px",

                                    },
                                };



                                const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart'));
                                pie_1_chart.draw(data, pie_1_options);
                            }
                            document.getElementById("Message2").textContent = "Total Expenses: ";
                            GoogleCharts.load(drawChart)

                        }
                    })
                    .catch(err => console.log(err));
            }
        }
        catch (Err) {
            document.getElementById("Message").textContent = "You might not be logged in.";
            console.log(Err);
        }


    }


    return (
        <>
            <div className={AnalyticsStyles.Page}>
                <div className={AnalyticsStyles.DashAside}>
                    {/* <Dashboard /> */}
                    <Dash />
                </div>
                <div className={AnalyticsStyles.Main} style={{backgroundColor: "aliceblue"}} >
                    <div className={AnalyticsStyles.Main} >
                        <button className={DashStyles.Dash_ul_li} onClick={handleBack} style={{ width: '10vw', marginTop: '0', right: '0%', color: 'black' }}>
                            Back
                        </button>
                        <h1>Analytics</h1>
                        <div style={{ display: "grid", justifyContent: "center" }} >
                            <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                            </div>
                        </div>
                        <div  >
                            <form onSubmit={makeChart}>
                                <button className={DashStyles.Dash_ul_li}  type="submit" onClick={handleClick} style={{color:"black"}} >Chart</button>
                            </form>
                        </div>
                    </div>
                    <br />
                    
                        <div style={{ display: "grid", justifyContent: "center" }} id="box" >
                            <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message2"></h5>
                            </div>
                        </div>
                        <br />
                        <div id="chart" className={AnalyticsStyles.chart} ></div>
                        <hr />
                
                </div>
            </div>
        </>
    );
}

export default Analytics