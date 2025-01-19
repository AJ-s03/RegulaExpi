import { useNavigate } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import InsiderDashStyles from "./InsiderDash.module.css"
// import Dash from "../../../../components/Dash/Dash"
// import DashStyles from "../../../../components/Dash/Dash.module.css"
import DeleteExpenses from "../../pages/Dashboard/Dashpages/SetExpenses _CRUD/DeleteExpenses.jsx"
import CheckExpenses from "../../pages/Dashboard/Dashpages/SetExpenses _CRUD/CheckExpenses.jsx"
import AddExpenses from "../../pages/Dashboard/Dashpages/SetExpenses _CRUD/AddExpenses.jsx"
import ModifyExpenses from "../../pages/Dashboard/Dashpages/SetExpenses _CRUD/ModifyExpenses.jsx"

function InsiderDash(props) {


    let navigate = useNavigate()
    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 100);
        navigate(-1) 
    
    
    }

    const handleAdd = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Add", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/AddExpenses", {state: result.data});
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/delete", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/DeleteExpenses", {state: result.data});
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleModify = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Modify", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/ModifyExpenses", {state: result.data});
                else
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleCheck = (e) => {

        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Check", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/CheckExpenses", {state: result.data});
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    return(
        <>
            <div className={InsiderDashStyles.Page}>
                <div className={InsiderDashStyles.Main}>
                    <button className={InsiderDashStyles.Dash_ul_li} onClick={handleClick} style={{width:'10vw', marginTop:'0', right:'0%' , color:'black'}}>
                        Back
                    </button>
                    <h1>Set Your Expenses</h1>
                        <ul className={InsiderDashStyles.Dash_ul} >
                                <li className={InsiderDashStyles.Dash_ul_li} style={{width:'inherit'}} >
                                    <Link to="/AddExpenses" style={{textDecoration:'none', color: 'black'}} onClick={handleAdd} >Add Expenses</Link>
                                </li>
                                <li className={InsiderDashStyles.Dash_ul_li} style={{width:'inherit'}}>
                                    <Link to="/ModifyExpenses" style={{textDecoration:'none', color: 'black'}} onClick={handleModify} >Update Expenses</Link>
                                </li>
                                <li className={InsiderDashStyles.Dash_ul_li} style={{width:'inherit'}}>
                                    <Link to="/DeleteExpenses" style={{textDecoration:'none', color: 'black'}} onClick={handleDelete} >Delete Expenses</Link>
                                </li>
                                <li className={InsiderDashStyles.Dash_ul_li} style={{width:'inherit'}}>
                                    <Link to="/CheckExpenses" style={{textDecoration:'none', color: 'black'}} onClick={handleCheck} >Check Your Expenses</Link>
                                </li>      
                            </ul>      
                </div>
                
                    <Routes>
                        <Route path='/CheckExpenses' element={<CheckExpenses />}></Route>
                        <Route path='/AddExpenses' element={<AddExpenses />}></Route>
                        <Route path='/DeleteExpenses' element={<DeleteExpenses />}></Route>
                        <Route path='/ModifyExpenses' element={<ModifyExpenses/>}></Route>
           
                    </Routes>
                

            </div>
        </>
    );
}

export default InsiderDash