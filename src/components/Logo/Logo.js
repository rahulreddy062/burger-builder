import React from 'react';
import Burgerlogo from '../../../src/assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = (props) =>(
    <div className = {classes.Logo} style={{height:props.height, marginBottom:props.marginBottom}}>
        <img src = {Burgerlogo} alt = "MyBurger"/>
    </div>
);
export default logo;