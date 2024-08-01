import React, { useState } from 'react'
import ButtonStyles from "./Button.module.css"


function Button(props) {

    const handleClick = (e) => {
        e.target.style.transform = 'scale(.8)'
        setTimeout(() => {
            e.target.style.transform = 'scale(1)'
        }, 80); 
    }

    return (
            <button id = 'butt' className={ButtonStyles.Button} onClick={props.handleClick} >{props.text}</button>
    );
    
}

export default Button

