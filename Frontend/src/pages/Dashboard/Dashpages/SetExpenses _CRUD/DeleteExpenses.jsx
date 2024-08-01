import { useNavigate, useLocation } from "react-router-dom"
import Dashboard from "../../Dashboard"
import Dash from "../../../../components/Dash/Dash";
import SetExpenses from "./SetExpenses";
import SetExpensesStyles from "./SetExpenses.module.css"
import InsiderDash from "../../../../components/InsiderDash/InsiderDash";
import axios from "axios";

function DeleteExpenses(props) {

    const navigate = useNavigate()
    const location = useLocation();

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80); 
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;

        try {
            if (location.state.session) {
                const user = location.state.user;
           
                axios.post("http://localhost:3000/api/Login/DeleteExpenses", { name,user }, { withCredentials: true })
                    .then(result => {
                        if (typeof (result.data) == "string")
                            document.getElementById("Message").textContent = result.data;
                        else {
                            document.getElementById("Message").textContent = "Deleted expense: ";
                            let boxElement = document.getElementById("box");
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
                    <h1>Delete Your Expenses</h1>
                    <p>Enter The Name </p>

                    <div className={SetExpensesStyles.Main} >
                        <form class={SetExpensesStyles.form} onSubmit={handleDelete} method="POST">
                            <div class={SetExpensesStyles.form_group}>
                                <label for="name">Enter the name:</label>
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

export default DeleteExpenses