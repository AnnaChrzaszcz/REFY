import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getNearbyParties} from "../api/refy";
import '../styles/NearbyParties.css';
import PartyPreview from "../components/PartyPreview";
import Header from "../components/Header";

const NearbyPartiesScreen = () => {

    const [nearbyParties, setNearbyParties] = useState([]);

    useEffect(() => {
        getNearbyParties().then(parties => {
            setNearbyParties(parties);
        })
    }, [])

    const partiesItems = nearbyParties.map((party, index) =>
            <Link key={party._id} style={{ textDecoration: 'none' }} to={{pathname: '/dashboard/nearbyParties/partyDetails', state: party}}>
                <PartyPreview channels={party.channels} buttonText={party.name} index={index}/>
            </Link>
    );

    return (
        <div className='nearbyParties-Screen'>
            <div className='animation-NearbyParties'>
                <Header headerText="Nearby Parties"/>
                <div className='partiesContainer' >
                    {partiesItems}
                </div>
            </div>
        </div>
    );
}

export default NearbyPartiesScreen;
