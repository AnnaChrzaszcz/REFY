import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {getToken, getUserInfo} from "../api/spotify";
import '../styles/Dashboard.css';
import DashboardButtons from "../components/DashboardButtons";
import {storeLocation} from "../functions/location";

const DashboardScreen = () => {

    setInterval(() => {
        getUserPosition()
    }, 60000);

    useEffect(() => {
        getUserPosition();
    }, [])

    const getUserPosition = () => {
        navigator.geolocation.getCurrentPosition(async position => {
            console.log('pobieram pozycje');
            const coord = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            await storeLocation(coord);
        })
    }

    return (
        <div className='dashboard-Screen'>
            <div className='animation-dashboard' >
            </div>
            <div className='menu-container'>
                <Link style={{ textDecoration: 'none' }} to='dashboard/nearbyParties'>
                    <DashboardButtons buttonText='Nearby Parties' iconName='music'/>
                </Link>
                <br/>
                <Link style={{ textDecoration: 'none' }} to='dashboard/createParty'>
                    <DashboardButtons buttonText='Create Party' iconName='create'/>
                </Link>
                <br/>
                <Link style={{ textDecoration: 'none' }} to='dashboard/myParties'>
                    <DashboardButtons buttonText='My Parties' iconName='heart'/>
                </Link>
            </div>

        </div>
    );
}

export default DashboardScreen;
