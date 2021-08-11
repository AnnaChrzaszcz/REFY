import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getNearbyParties} from "../api/refy";

const NearbyPartiesScreen = () => {

    const [nearbyParties, setNearbyParties] = useState([]);

    useEffect(() => {
        getNearbyParties().then(parties => {
            setNearbyParties(parties);
        })
    }, [])

    const partiesItems = nearbyParties.map((party) =>
        <li key={party._id}>
            <Link to={{pathname: '/dashboard/nearbyParties/partyDetails', state: party}}>
            <button>{party.name}</button>
            </Link>
        </li>
    );

    return (
        <div className='app'>
            <h1>NearbyPartiesScreen</h1>
            <ul>
                {partiesItems}
            </ul>
        </div>
    );
}

export default NearbyPartiesScreen;
