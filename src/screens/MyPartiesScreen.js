import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getUser, getUserParties} from "../api/refy";

const MyPartiesScreen = () => {

    const [user, setUser] = useState('');
    const [userParties, setUserParties] = useState([]);

    useEffect(() => {
        getUser().then(user => {
            console.log(user);
            setUser(user);
            getUserParties().then(parties => {
                setUserParties(parties);
            })
        })
    }, []);

    const partiesItems = userParties.map((party) =>
        <li key={party._id}>
            <Link to={{pathname: '/dashboard/nearbyParties/partyDetails', state: party}}>
                <button>{party.name}</button>
            </Link>
        </li>
    );

    return (
        <div className='app'>
            <h1>My Parties Screen</h1>
            <p>{user.spotifyId}</p>
            <ul>
                {partiesItems}
            </ul>
        </div>
    );
}

export default MyPartiesScreen;
