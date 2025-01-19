
import NavStyles from "./NavBar.module.css"

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from '../../pages/Home.jsx';
import Dashboard from '../../pages/Dashboard/Dashboard.jsx';
import About from '../../pages/About.jsx';
import axios from "axios";
import Sign_up from "../../pages/Sign_up.jsx"
import Contacts from "../../pages/Contacts.jsx";

function NavBar() {

  const navigate = useNavigate();

  const handleDash = (e) => {

    e.preventDefault();
    axios.get("https://regulaexpi-backend.onrender.com/api/Login/NavBar",{withCredentials: true})
        .then(result => {
            if (result.data)
              navigate("/Dashboard");
            else 
              navigate("/Sign_up");
        })
        .catch(err => console.log(err));
};



  return (
    <>
      <nav className={NavStyles.Nav} >
        {/* <h1>RegulaExpi</h1> */}
        <ul className={NavStyles.Nav_ul}>
          <li className={NavStyles.Nav_ul_li}><Link to="/Home" style={{ textDecoration: 'none' }} >Home</Link></li>
          <li className={NavStyles.Nav_ul_li}><Link to="/Dashboard/*" onClick={handleDash}  style={{ textDecoration: 'none' }} >Dashboard</Link></li>
          <li className={NavStyles.Nav_ul_li}><Link to="/About" style={{ textDecoration: 'none' }}>About</Link></li>
        </ul>

        <div className={NavStyles.dropdown}>
          <button class={NavStyles.dropbtn}>. . .</button>
          <div class={NavStyles.dropdown_content}>
            <Link to="/Contacts" style={{ textDecoration: 'none' }}>Contacts</Link>
          </div>
        </div>
      </nav>
      <br /><br /><br /><br /><br />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Contacts" element={<Contacts />} />
      
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default NavBar;