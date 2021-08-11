import React from 'react';
import logo from "../assets/logoTmp.png";
import weConnect from "../assets/weConnect.png";
import store from '../reducers/Store'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {RefyButton} from "../components/RefyButton";

const WelcomeScreen = () => {

    return (
        <div className='app'>
            <img src={logo} alt="logo" />
            <br/>
            <img src={weConnect} alt="weConnect" />
            <br/>
            <Link to='/login'>
                <RefyButton text='WANNA JOIN'/>
            </Link>
        </div>
    );
}

export default WelcomeScreen;
