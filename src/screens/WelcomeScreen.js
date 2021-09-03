import React, {useEffect, useState} from 'react';
import logo from "../assets/logoTmp.png";
import weConnect from "../assets/weConnect.png";
import {Link} from "react-router-dom";
import {RefyButton} from "../components/RefyButton";
import '../App.css';
import useWindowDimensions from "../functions/useWindowDimensions";

const WelcomeScreen = () => {

    const { height, width } = useWindowDimensions();

    return (
        <div className='welcomeScreen'>
            <img src={logo} alt="logo" />
            <br/>
            <img style={{width: width * 2/3}} src={weConnect} alt="weConnect" />
            <br/>
            <br/>
            <Link to='/login'>
                <RefyButton text='WANNA JOIN'/>
            </Link>
        </div>
    );
}

export default WelcomeScreen;
