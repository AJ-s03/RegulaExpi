import React from "react";
import TC from "./T&C.module.css"


function T_C(props) {

    return (
        <>
            <div className={TC.Page}>
                <div className={TC.Main}>
                    <h1>Terms and Conditions for Merchant Account Details</h1>
                    <ul>
                        <li>
                            <strong>Accuracy of Merchant Account Information:</strong>
                            <p>Users are required to provide accurate and complete merchant account details for all transactions. It is the user's responsibility to verify the correctness of the merchant account information before submitting any payment.</p>
                        </li>
                        <li>
                            <strong>Liability for Incorrect Payments:</strong>
                            <p>In the event that a payment is made to an incorrect merchant account due to inaccurate information provided by the user, the user will be solely liable for any resulting loss or inconvenience. The web app and its developers will not be responsible for recovering funds or compensating for any payments made to the wrong recipient.</p>
                        </li>
                        <li>
                            <strong>User Responsibility:</strong>
                            <p>Users must ensure that all merchant account details are up-to-date and correct at the time of payment. Any changes to merchant account information should be promptly updated in the user's account settings.</p>
                        </li>
                        <li>
                            <strong>Dispute Resolution:</strong>
                            <p>In case of any disputes arising from incorrect payments, users are encouraged to contact the recipient directly to resolve the issue. The web app will provide support to facilitate communication between the user and the recipient but will not mediate or resolve disputes.</p>
                        </li>
                        <li>
                            <strong>Acknowledgment:</strong>
                            <p>By using the web app, users acknowledge and agree to these terms and conditions. Users understand that they are responsible for the accuracy of the merchant account details they provide and accept liability for any errors.</p>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default T_C