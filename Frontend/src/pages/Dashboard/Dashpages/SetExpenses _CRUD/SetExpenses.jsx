import { useNavigate } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SetExpensesStyles from "./SetExpenses.module.css"
import Dash from "../../../../components/Dash/Dash"
import DashStyles from "../../../../components/Dash/Dash.module.css"
import InsiderDash from "../../../../components/InsiderDash/InsiderDash";

function SetExpenses(props) {


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
            <div className={SetExpensesStyles.Page}>
                <div className={SetExpensesStyles.DashAside}>
                    <Dash/>
                </div>
                <InsiderDash/>
            </div>
        </>
    );
}

export default SetExpenses