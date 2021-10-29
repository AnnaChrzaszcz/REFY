import React from 'react';
import {addNewListener} from "../api/refy";
import { useHistory } from "react-router-dom";
import store from "../reducers/Store";

export default function Channel({channel, partyId}) {

    const history = useHistory();

    const addNewListenerF = () => {
        addNewListener(partyId, channel.number).then(updatedParty => {
            store.dispatch({ type: 'party/setChannels', payload: updatedParty.channels});
            let x = updatedParty.channels.find(u => u.number === channel.number);
            history.push('/dashboard/nearbyParties/partyDetails/channelDetails', {channel: x, partyId: partyId});
        })
    }

    return (
        <div style={{backgroundColor: channel?.color, width: '40vh', height: '60vh', borderWidth: 1, borderRadius: 10, margin: '10% 15px'}}>
                <div style={{display: 'flex', flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '100%'}} onClick={() => addNewListenerF()}>
                    <p style={{textAlign: 'center', color: 'white', fontSize: '5vh', marginBottom: '30%'}}>{channel?.number+1}</p>
                    <p style={{textAlign: 'center', color: 'white', fontSize: '3vh'}}>{channel?.name}</p>
                </div>
        </div>
    );
}
