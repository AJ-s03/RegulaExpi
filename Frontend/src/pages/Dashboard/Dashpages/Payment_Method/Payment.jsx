import { useNavigate, useLocation } from "react-router-dom"
// import Dashboard from "../Dashboard"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PaymentStyles from "./Payment.module.css"
import Dash from "../../../../components/Dash/Dash"
import DashStyles from "../../../../components/Dash/Dash.module.css"
import axios from "axios";
import Card from "../../../../components/Card/Card"
import { loadStripe } from '@stripe/stripe-js'
// import 'dotenv/config';

// const stripe_key = process.env.STRIPE_PUB;

function Payment(props) {


    let navigate = useNavigate()
    let location = useLocation()
    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 50);
        navigate(-1)
    }

    let expensesArray = location.state.expenses
    console.log(expensesArray)
    
    // let expensesArray = []

    // for (let i = 0 ; i < expenses.length; i++) {
    //     let array = []
    //     array.push( String(expenses[i]['name']))
    //     array.push(String(expenses[i]['amount'].$numberDecimal))
    //     expensesArray.push(array)

    // }

    // console.log(typeof(expensesArray))
    // console.log(expensesArray)
    


        const handlePayment = async (e, name, amount) => {
            e.preventDefault();

            try {
                if (location.state.session) {

                    const stripe = await loadStripe("pk_test_51Pu7rm08CrFwVN03cODqPvTftGCDNkS84Ua6aPXgejxFrTMTiLOmzVYGpjnvJddqA7qCRwf17TvfItgPNrV3VxPz00lOPvelYc");
                    
                    const user = location.state.user;
                    console.log(user, name)
                    axios.post("https://regulaexpi-backend.onrender.com/api/Login/Pay", {user, name, amount}, { withCredentials: true })
                        .then(result => {
                            console.log(result.data);                
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
                <div className={PaymentStyles.Page}>
                    <div className={PaymentStyles.DashAside}>
                        {/* <Dashboard /> */}
                        <Dash />
                    </div>
                    <div className={PaymentStyles.Main} >
                        <div className={PaymentStyles.main} >
                            <h1>Payment</h1>
                        </div>
                        <div style={{ display: "grid", justifyContent: "center" }} >
                            <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                            </div>

                        </div>
                        <br />
                        <div className={PaymentStyles.main} id="box">

                            {expensesArray.map((object) => (
                                
                                <Card z_index='3' src='' alt=''
                                    name={object[0]}
                                    amount={object[1]}
                                    w="200px"
                                    h="200px"
                                    handleClick = {(e) => {handlePayment(e, object[0], object[1])}}
                                    rise="all 100s ease-in-out"
                                    button="pay"
                                    image="hidden"
                                />
                                
                            ))}

                        </div>
                        <div className={PaymentStyles.main} >
                            <button className={DashStyles.Dash_ul_li} onClick={handleClick} style={{ width: '10vw', marginTop: '0', right: '0%', color: 'black' }}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default Payment