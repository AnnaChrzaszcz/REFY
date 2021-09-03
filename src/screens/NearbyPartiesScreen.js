import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getNearbyParties} from "../api/refy";
import '../styles/NearbyParties.css';
import PartyPreview from "../components/PartyPreview";
import {FiArrowLeft} from "react-icons/fi";
import { useHistory } from "react-router-dom";

const NearbyPartiesScreen = () => {

    const [nearbyParties, setNearbyParties] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getNearbyParties().then(parties => {
            setNearbyParties(parties);
        })
    }, [])

    const goBack = () => {
        history.goBack();
    }


    const partiesItems = nearbyParties.map((party) =>
            <Link key={party._id} style={{ textDecoration: 'none' }} to={{pathname: '/dashboard/nearbyParties/partyDetails', state: party}}>
                <PartyPreview buttonText={party.name}/>
            </Link>
    );

    return (
        <div className='nearbyParties-Screen'>
            <div className='animation-NearbyParties'>
                <div className='header'>
                    <FiArrowLeft onClick={goBack}  color='white' size='25%' />
                    <h1 style={{color: 'white', margin: '0 3%', fontSize: '4vh'}}>Nearby Parties</h1>
                </div>
                <div className='nearbyParties' >
                    {partiesItems}
                </div>
            </div>
        </div>
    );
}

export default NearbyPartiesScreen;
