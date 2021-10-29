import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getToken, getUserInfo} from "../api/spotify";
import {createUser as createRefyUser, storeUser} from "../api/refy";
import '../styles/Dashboard.css';
import DashboardButtons from "../components/DashboardButtons";

const DashboardScreen = () => {

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
