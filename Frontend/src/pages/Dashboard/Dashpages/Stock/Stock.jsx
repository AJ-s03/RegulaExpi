import { useNavigate, useLocation } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StockStyles from "./Stock.module.css"
import Dash from "../../../../components/Dash/Dash"
import DashStyles from "../../../../components/Dash/Dash.module.css"
import axios from "axios";

function Stock(props) {


    let navigate = useNavigate();
    let location = useLocation();


    const handleBack = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 100);
        navigate(-1)
    }

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
    }

    const handleGetStock = (e) => {
        e.preventDefault()
        const keyword = document.getElementById("keyword").value;
        const container = document.getElementById("container");
        try {
            if (location.state.session) {

                // const user = location.state.user;

                // axios.post("http://localhost:3000/api/Login/GetStock", { keyword }, { withCredentials: true })
                //     .then(result => {


                //     })
                //     .catch(err => console.log(err));

                const script = document.createElement("script");
                script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
                script.type = "text/javascript";
                script.async = true;
                script.innerHTML = `
                        {
                            "width": "980",
                            "height": "610",
                          "symbol": "NASDAQ:${keyword}",
                          "interval": "D",
                          "timezone": "Etc/UTC",
                          "theme": "dark",
                          "style": "1",
                          "locale": "en",
                          "allow_symbol_change": true,
                          "calendar": false,
                          "support_host": "https://www.tradingview.com"
                        }`;
                container.appendChild(script);

            }
        }
        catch (Err) {
            document.getElementById("Message").textContent = "You might not be logged in.";
            console.log(Err);
        }



    }

    return (
        <>
            <div className={StockStyles.Page}>
                <div className={StockStyles.DashAside}>
                    {/* <Dashboard /> */}
                    <Dash />
                </div>
                <div className={StockStyles.Main} style={{backgroundColor: "aliceblue"}} >
                    <div className={StockStyles.Main} >
                        <button className={DashStyles.Dash_ul_li} onClick={handleBack} style={{ width: '10vw', marginTop: '0', right: '0%', color: 'black' }}>
                            Back
                        </button>
                        <br />
                        <h1>Stock</h1>
                        Symbol :
                        <form class={StockStyles.form} onSubmit={handleGetStock} method="POST">
                                <input type="text" id="keyword" name="name" />
                                <div >
                                    <button className={DashStyles.Dash_ul_li} style={{color: "black"}} type="submit" onClick={handleClick} >Search</button>
                                </div>
                        </form>
                        <br />
                    </div>
                        <div id="container" className={StockStyles.Container}>


                            <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
                        </div>
                        <br />
                        <div style={{ display: "grid", justifyContent: "center" }} id="box" >
                            <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            );
}

            export default Stock