import { useNavigate, useLocation } from "react-router-dom"
import React, { useState } from "react";
import Dashboard from "../../Dashboard"
import Dash from "../../../../components/Dash/Dash";
import SetExpenses from "./SetExpenses";
import SetExpensesStyles from "./SetExpenses.module.css"
import InsiderDash from "../../../../components/InsiderDash/InsiderDash";
import axios from "axios";
import DataTable from 'react-data-table-component';

function CheckExpenses(props) {
    const navigate = useNavigate()
    const location = useLocation();

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;

        try {
            if (location.state.session) {
                const user = location.state.user;
                axios.post("https://regulaexpi-backend.onrender.com/api/Login/CheckExpenses", { name, user }, { withCredentials: true })
                    .then(result => {
                        if (typeof (result.data) == "string")
                            document.getElementById("Message").textContent = result.data;
                        else {
                            let boxElement = document.getElementById("box");
                            if (result.data.length > 0) {
                                document.getElementById("Message").textContent = "Fetched results";
                                for (let i = 0; i < result.data.length; i++) {

                                    const childElement = document.createElement('div');
                                    childElement.innerHTML = `
                                    <table style = {{width: 50%;}}>
                                        <thead>
                                            <th>Name: </th>
                                            <th>UPI: </th>
                                            <th>Amount: </th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${result.data[i].name}</td>
                                                <td>${result.data[i].upi}</td>
                                                <td>${result.data[i].amount.$numberDecimal}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br/><hr/>
                                `;


                                    boxElement.appendChild(childElement);
                                }


                            }
                            else {
                                document.getElementById("Message").textContent = "Fetched results";
                                const childElement = document.createElement('div');
                                childElement.innerHTML = `
                                    <table>
                                        <thead>
                                            <th>Name: </th>
                                            <th>UPI: </th>
                                            <th>Amount: </th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${result.data.name}</td>
                                                <td>${result.data.upi}</td>
                                                <td>${result.data.amount.$numberDecimal}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                `;
                                boxElement.appendChild(childElement);
                            }


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
            <div className={SetExpensesStyles.Page}>
                <div className={SetExpensesStyles.DashAside}>
                    <Dash />
                </div>
                <div className={SetExpensesStyles.Main}>

                    <InsiderDash />
                    <hr />
                    <h1>Check Your Expenses</h1>

                    <div className={SetExpensesStyles.Main} style={{backgroundColor:'white'}} >
                        <p>Name of the expense </p>
                        <p>(*) for all</p>
                        <form class={SetExpensesStyles.form} onSubmit={handleSearch} method="POST">
                            <div class={SetExpensesStyles.form_group}>
                                <input type="text" id="name" name="name" />
                                <div class={SetExpensesStyles.form_group} >
                                    <button type="submit" onClick={handleClick} >Search</button>
                                </div>
                            </div>
                        </form>
                        <br />
                        <div style={{ display: "grid", justifyContent: "center" }} id="box" >
                            <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CheckExpenses