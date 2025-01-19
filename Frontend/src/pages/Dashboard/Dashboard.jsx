import DashStyles from "./Dashboard.module.css"

import React from "react";
import Dash from "../../components/Dash/Dash"

function Dashboard(props) {


    return (
        <>
            <div className={DashStyles.Dashboard}>
                <Dash />

                <div>
                    <div className={DashStyles.Guide} id="Guide">
                        <h1>Welcome To The Dashboard </h1>
                       
                        <p>Our dashboard provides a seamless experience for managing your expenses, analyzing financial data, and staying informed about stock market trends. Here’s what you can do:</p>

                        <hr />
                        <h2>  Expense Management: </h2>
                        <p>Create, update, and delete expenses effortlessly.</p>
                        <p>Keep track of your spending with detailed records.</p>

                        <hr />
                        <h2>Payment Center:</h2>

                        <p>Pay your expenses securely within the platform.</p>
                        <p>Choose from various payment methods for convenience.</p>


                        <hr />
                        <h2>Analytics and Insights:</h2>

                        <p>Visualize your financial data using interactive charts.</p>
                        <p>Gain insights into your spending patterns and trends.</p>


                        <hr />
                        <h2>Stock Market Explorer:</h2>

                        <p>Stay informed about stock prices, trends, and company performance.</p>
                        <p>Explore real-time data and make informed investment decisions.</p>


                        <hr />
                        <h2>Feedback Corner:</h2>

                        <p>Share your thoughts and suggestions with us!</p>
                        <p>Help us improve by providing valuable feedback.</p>




                    </div>
                </div>
            </div>

        </>
    )

}

export default Dashboard

