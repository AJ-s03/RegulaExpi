import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


//components
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';

// pages
import Home from './pages/Home.jsx';
import Sign_up from './pages/Sign_up.jsx';
import Contacts from './pages/Contacts.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
  //Dashpages
  import SetExpenses from './pages/Dashboard/Dashpages/SetExpenses _CRUD/SetExpenses.jsx';
    // SetExpenses Pages
    import AddExpenses from './pages/Dashboard/Dashpages/SetExpenses _CRUD/AddExpenses.jsx';
    import CheckExpenses from './pages/Dashboard/Dashpages/SetExpenses _CRUD/CheckExpenses.jsx';
    import DeleteExpenses from './pages/Dashboard/Dashpages/SetExpenses _CRUD/DeleteExpenses.jsx';
    import ModifyExpenses from './pages/Dashboard/Dashpages/SetExpenses _CRUD/ModifyExpenses.jsx';
  
  import Payment from './pages/Dashboard/Dashpages/Payment_Method/Payment.jsx';
  import Analytics from './pages/Dashboard/Dashpages/Analytics/Analytics.jsx';
  import Settings from './pages/Dashboard/Dashpages/Settings/Settings.jsx';
  import Stock from './pages/Dashboard/Dashpages/Stock/Stock.jsx';
  import Feedback from "./pages/Dashboard/Dashpages/Feedback/Feedback.jsx";
  import Logout from './pages/Logout.jsx';
import { Button } from 'bootstrap';



function App() {



  return (<>
    <Router>
        <NavBar/> 
        <Link to="/" ></Link>
       
          <Routes>
            <Route path="/" element={<Sign_up />} /> 
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
 
            <Route path='/SetExpenses' element={<SetExpenses />}> </Route>
            <Route path='/Payment' element={<Payment />}> </Route>
            <Route path='/Analytics' element={<Analytics />}> </Route>
            <Route path='/Settings' element={<Settings />}> </Route>
            <Route path='/Feedback' element={<Feedback />}> </Route>
            <Route path='/Stock' element={<Stock />}> </Route>
            <Route path='/Logout' element={<Logout />}> </Route>


            <Route path='/CheckExpenses' element={<CheckExpenses />}> </Route>
            <Route path='/AddExpenses' element={<AddExpenses />}> </Route>
            <Route path='/DeleteExpenses' element={<DeleteExpenses />}> </Route>
            <Route path='/ModifyExpenses' element={<ModifyExpenses/>}> </Route>

          <Route path="/" element={<Sign_up />} />
          <Route path="/Sign_up" element={<Sign_up />} />
          <Route path="/Login" element={<Login />}/>
          {/* <Route path="/About" element={<About />} /> */}
          </Routes>
        
        <Footer/>
        </Router>
    
      </>
  );
}

export default App;


// import React from 'react';
// import { Router, Routes, Route } from 'react-router-dom';
// import Sign_up from "./pages/Sign_up.jsx";
// import Login from "./pages/Login.jsx";


// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/Sign_up" element={<Sign_up />} />
//                 <Route path="/Login" element={<Login />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;