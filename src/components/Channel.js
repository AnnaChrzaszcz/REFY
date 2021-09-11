import {Link} from "react-router-dom";
import React from 'react';
import {addNewListener} from "../api/refy";

export default function Channel({channel, partyId}) {

    return (
        <div style={{backgroundColor: channel?.color, width: '40vh', height: '60vh', borderWidth: 1, borderRadius: 10, margin: '10% 15px'}}>
            <Link style={{textDecoration: 'none'}} to={{pathname: '/dashboard/nearbyParties/partyDetails/channelDetails', state: channel}} onClick={() => addNewListener(partyId, channel.number)}>
                <div style={{display: 'flex', flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <p style={{textAlign: 'center', color: 'white', fontSize: '5vh', marginBottom: '30%'}}>{channel?.number+1}</p>
                    <p style={{textAlign: 'center', color: 'white', fontSize: '3vh'}}>{channel?.name}</p>
                </div>
            </Link>
        </div>
    );
}
