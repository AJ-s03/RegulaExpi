import { useNavigate, useLocation } from "react-router-dom"
import Dashboard from "../../Dashboard"
import Dash from "../../../../components/Dash/Dash";
import SetExpenses from "./SetExpenses";
import SetExpensesStyles from "./SetExpenses.module.css"
import InsiderDash from "../../../../components/InsiderDash/InsiderDash";
import axios from "axios";

function AddExpenses(props) {

    let navigate = useNavigate()
    const location = useLocation();

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80); 
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const upi = document.getElementById("id").value;
        const amount = document.getElementById("amount").value;
        try {
            if (location.state.session) {
                const user = location.state.user;
                axios.post("https://regulaexpi-backend.onrender.com/api/Login/AddExpenses", { name, user, upi, amount}, { withCredentials: true })
                    .then(result => {
                        document.getElementById("Message").textContent = result.data;
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
                    <div style={{ display: "grid", justifyContent: "center" }} >
                        <div><h5 style={{ color: 'rgb(0, 0, 115)', fontFamily: 'Courier New' }} id="Message"></h5>
                        </div>

                    </div>
                    <h1>Add Your Expenses</h1>

                    <form class={SetExpensesStyles.form} onSubmit={handleAdd} method="POST">
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
                        <br />
                        <label>
                            <input type="checkbox" name="T&C" id="T&C" /> <a href="">Terms & Conditions</a>
                        </label>
                        <p>
                            Before submitting your expenses, please ensure you have reviewed and agreed to our Terms & Conditions. It's important to understand the guidelines and policies that govern the use of our service. By proceeding, you acknowledge that you have read and accepted our Terms & Conditions, which outline responsibilities, liabilities, and other important information. Your compliance helps us maintain a secure and efficient platform for managing your regular expenses. Thank you for your attention to this matter
                        </p>
                        <div class={SetExpensesStyles.form_group} >
                            <button type="submit" onClick={handleClick} >Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}

export default AddExpenses
