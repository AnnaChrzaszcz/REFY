import {Link} from "react-router-dom";
import React from 'react';
import {addNewListener} from "../api/refy";

export default function Channel({channel, partyId}) {

    return (
        <Link to={{pathname: '/dashboard/nearbyParties/partyDetails/channelDetails', state: channel}} onClick={() => addNewListener(partyId, channel.number)}>
            <button style={{backgroundColor: channel?.color}}>{channel?.name + ' - ' + channel?.playlistURL}</button>
        </Link>
    );
}
