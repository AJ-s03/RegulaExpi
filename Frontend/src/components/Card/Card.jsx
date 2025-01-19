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
        <div className={CardStyles.Card} style = {{ width: `${props.w}`, height: `${props.h}`, transition: `${props.rise}`}} >
            <img src={props.src} alt={props.alt} className={CardStyles.Img} style={{visibility: `${props.image}`}} />
            <span>{props.desc}</span>
            <span>{props.name}</span>
            <span>{props.amount}</span>
            <br />
            <Button text={props.button} handleClick={props.handleClick} />
        </div>
    );

}

export default Card