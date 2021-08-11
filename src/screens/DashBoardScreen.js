import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getToken, getUserInfo} from "../api/spotify";
import {createUser as createRefyUser, storeUser} from "../api/refy";

const DashboardScreen = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
   /*     getToken().then(token => {
            createUser(token);
        })*/
    }, [])

    const createUser = (token) => {
        getUserInfo(token).then(me => {
            setUser(me.display_name);
            createRefyUser(me.display_name).then(createdUser => {
                storeUser(createdUser).then(() => {
                    console.log(createdUser);
                })
            })
        })
    }

    return (
        <div className='app'>
           <h1>Dashboard screen</h1>
            <Link to='dashboard/nearbyParties'>
            <button>Nearby Parties</button>
            </Link>
            <br/>
            <Link to='dashboard/createParty'>
            <button>Create Party</button>
            </Link>
            <br/>
            <Link to='dashboard/myParties'>
            <button>My Parties</button>
            </Link>
        </div>
    );
}

export default DashboardScreen;
