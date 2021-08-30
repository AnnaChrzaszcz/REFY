import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import store from "../reducers/Store";
import Channel from "../components/Channel";

const PartyDetailsScreen = () => {

    let location = useLocation();
    const [party, setParty] = useState({});

    useEffect(() => {
        if(location.state){
            setParty(location.state);
        }
        else{
            if(store.getState().newParty){
                setParty(store.getState().newParty);
            }
        }
    }, [])

    const channelItemComponent = party?.channels?.map((channel) =>
        <li key={channel.number}>
            <Channel channel={channel} partyId={party._id}/>
        </li>
    );

    return (
        <div className='app'>
            <h1>PartyDetailsScreen</h1>
            <p>PARTY NAME: {party.name}</p>
            {party.channels &&
            <ul>
                {channelItemComponent}
            </ul>
            }
        </div>
    );
}

export default PartyDetailsScreen;
