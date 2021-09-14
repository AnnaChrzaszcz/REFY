import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getUser, getUserParties} from "../api/refy";
import PartyPreview from "../components/PartyPreview";
import '../styles/MyParties.css';
import Header from "../components/Header";

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

    const partiesItems = userParties.map((party, index) =>
            <Link key={party._id} style={{ textDecoration: 'none' }} to={{pathname: '/dashboard/nearbyParties/partyDetails', state: {newParty: false, party: party}}}>
                <PartyPreview channels={party.channels} buttonText={party.name} index={index}/>
            </Link>
    );

    return (
        <div className='myParties-Screen'>
            <div className='animation-NearbyParties'>
                <Header headerText="My Parties"/>
                <div className='partiesContainer' >
                    {partiesItems}
                </div>
            </div>
        </div>
    );
}

export default MyPartiesScreen;
