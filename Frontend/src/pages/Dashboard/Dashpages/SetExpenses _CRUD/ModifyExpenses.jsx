import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react";
import Dashboard from "../../Dashboard"
import Dash from "../../../../components/Dash/Dash";
import SetExpenses from "./SetExpenses";
import SetExpensesStyles from "./SetExpenses.module.css"
import InsiderDash from "../../../../components/InsiderDash/InsiderDash";
import axios from "axios";

function ModifyExpenses(props) {

    const navigate = useNavigate()
    const location = useLocation();
    const [expense, setExpense] = useState("");
   
    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80); 
    }

    const handleIdentify = (e) => {
        e.preventDefault();
        const name = document.getElementById("expense").value;
        
        
        try {
            if (location.state.session) { 
                setExpense(name);
                document.getElementById("modal").style.visibility = 'visible';
            }
        }
        catch (Err) {
            document.getElementById("Message").textContent = "You might not be logged in.";
            console.log(Err);
        }

    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const upi = document.getElementById("id").value;
        const amount = document.getElementById("amount").value;
        try {
            if (location.state.session) {
                const user = location.state.user;

                axios.post("https://regulaexpi-backend.onrender.com/api/Login/ModifyExpenses", { name, user, upi, amount, expense }, { withCredentials: true })
                    .then(result => {
                        if (result.data.charAt(0) === "E")
                            document.getElementById("Message").textContent = result.data;
                        else{
                            document.getElementById("Message").textContent = "Update is done";
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
                    <h1>Update Your Expenses</h1>
                    <p>Name</p>
                    <div className={SetExpensesStyles.Main} >
                        <form onSubmit={handleIdentify} method="post">
                            <div class={SetExpensesStyles.form_group}>

                                <input type="text" id="expense" name="name1" />
                                <div class={SetExpensesStyles.form_group} >
                                    <button type="submit" onClick={handleClick} >Search</button>
                                </div>
                            </div>
                        </form>
                        <div style={{ display: "grid", justifyContent: "center" }} id="box" >
                            <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                            </div>
                        </div>
                        <hr />
                        <br />
                        <form onSubmit={handleUpdate} method="post" id="modal" style={{ visibility: "hidden" }}>
                            <div class={SetExpensesStyles.form_group}>

                                <div class={SetExpensesStyles.form_group}>
                                    <label for="name">Name</label>
                                    <p>(should be unique among your expenses)</p>
                                    <input type="text" id="name" name="name"
                                        placeholder="Enter the name" required />
                                    <br />
                                    <label for="name">UPI id</label>
                                    <input type="text" id="id" name="id"
                                        placeholder="Enter the UPI" required />
                                    <input type="text" id="amount" name="amount"
                                        placeholder="$$$" required />
                                </div>
                                <div class={SetExpensesStyles.form_group} >
                                    <button type="submit" onClick={handleClick} >Update</button>
                                </div>
                            </div>
                        </form>
                        <br />
                    </div>

                </div>
            </div>
        </>
    );
}

export default ModifyExpenses
