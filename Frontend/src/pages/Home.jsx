import React from "react"
import NavBar from "../components/NavBar/NavBar"
import Card from "../components/Card/Card"
import HomeStyles from "./Home.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Home() {
   
    const navigate = useNavigate();

    const handleSetExpenses = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/SetExpenses", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/SetExpenses");
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };

    const handleStock = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Stock", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/Stock", {state: result.data});
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    }; 
    
    const handleAnalytics = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80);
        e.preventDefault();
        axios.get("https://regulaexpi-backend.onrender.com/api/Login/Analytics", { withCredentials: true })
            .then(result => {
                if (result.data)
                    navigate("/Analytics", {state: result.data} );
                else 
                    navigate("/Sign_up");
            })
            .catch(err => console.log(err));
    };
    
    return (
     <>

        
        <div className= {HomeStyles.Home} >
            <div className={HomeStyles.Welcard} >
                <h1>Welcome To RegulaExpi!</h1>
                <p>Simplify your financial life with RegulaExpi,</p>
                <p>your all-in-one solution for managing monthly expenses and gaining valuable insights.</p>
                <p>Whether it's tracking bills, analyzing spending habits, or staying on budget, we've got you covered</p>
                <p>Sign up today and take control of your finances effortlessly.</p>

            </div>
            <div className={HomeStyles.CardPlain} >
                <Card  z_index = '3' src = 'https://cdn.corporatefinanceinstitute.com/assets/discretionary-expense.jpeg' alt = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jHabMoZsxgwdvXKbYt1UmbyBoP4_P12eeQ&s'
                desc = "Set Your Regular expenses and pay all the bills at once!"
                rise = "all .4s ease-in-out"
                button = "Go"
                image = "visible"
                handleClick = {handleSetExpenses}
                /> 
                <br />
                <Card z_index = '3' src = 'https://i.insider.com/6011ac2b6dfbe10018e0049f?width=750&format=jpeg&auto=webp' alt = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jHabMoZsxgwdvXKbYt1UmbyBoP4_P12eeQ&s'
                desc = "Browse The Stock Market And See Your Investment Opportunities!"
                rise = "all .4s ease-in-out"
                button = "Go"
                image = "visible"
                handleClick = {handleStock}
                /> 
                <br />
                <Card z_index = '3' src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMRlGNtmTdR635KmOGtBi1eVb7o4k8NmBmw&s' alt = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jHabMoZsxgwdvXKbYt1UmbyBoP4_P12eeQ&s'
                desc = "See Analytics Of Your Yearly Spending On Regular Expenses and more!"
                rise = "all .4s ease-in-out"
                button = "Go"
                image = "visible"
                handleClick = {handleAnalytics}
                /> 
            </div>
        </div>

    </>
       
    )

}

export default Home