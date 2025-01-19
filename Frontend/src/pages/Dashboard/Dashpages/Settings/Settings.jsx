import { useNavigate } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SettingsStyles from "./Settings.module.css"
import Dash from "../../../../components/Dash/Dash"
import DashStyles from "../../../../components/Dash/Dash.module.css"

function Settings(props) {


    let navigate = useNavigate()
    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 100);
        navigate(-1) 
    }

    return(
        <>
            <div className={SettingsStyles.Page}>
                <div className={SettingsStyles.DashAside}>
                    {/* <Dashboard /> */}
                    <Dash/>
                </div>
                <div className={SettingsStyles.Main} >
                    <button className={DashStyles.Dash_ul_li} onClick={handleClick} style={{width:'10vw', marginTop:'0', right:'0%' , color:'black'}}>
                        Back
                    </button>
                    <h1>Settings</h1>
                </div>
            </div>
        </>
    );
}

export default Settings