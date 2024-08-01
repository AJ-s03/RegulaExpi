import React from 'react'
import CardStyles from "./Card.module.css"
import Button from '../Button/Button';

function Card(props) {
    
    // const increaseZ = (e) =>{
    //     console.log(e.target.style)
    //     e.target.style.z_index = 3;
    // }

    // const decreaseZ = (e) =>{
    //     e.target.style.z_index = 1;
    // }

    return (
        <div className={CardStyles.Card}  > 
            <img src={props.src} alt={props.alt} className={CardStyles.Img} />
            <p>{props.desc}</p>
            <br />
            <Button text = "Go" handleClick = {props.handleClick}/>
        </div>
    );

}

export default Card