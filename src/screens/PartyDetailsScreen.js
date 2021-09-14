import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import '../styles/PartyDetails.css';
import store from "../reducers/Store";
import Channel from "../components/Channel";
import {FiArrowLeft} from "react-icons/fi";
import { useHistory } from "react-router-dom";

const PartyDetailsScreen = () => {

    let location = useLocation();
    const [party, setParty] = useState({});
    const history = useHistory();

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

    const goBack = () => {
        if(location.state){
            history.goBack();
        }
        else{
            history.push('/dashboard');
        }

    }

    const channelItemComponent = party?.channels?.map((channel) =>
        <div key={channel.number}>
            <Channel channel={channel} partyId={party._id}/>
        </div>
    );

    return (
        <div className='partyDetailsScreen'>
            <div className='header-partyDetails'>
                <FiArrowLeft onClick={goBack}  color='white' size='10%' style={{margin: '8% 0'}}/>
                <br/>
                <text style={{color: 'white', fontSize: '5vh'}}>{party.name}</text>
                <br/>
                <br/>
                <text style={{color: 'white', fontSize: '4vh'}}>Channels</text>
            </div>
            {party.channels &&
            <div className='channel-container'>
                {channelItemComponent}
            </div>
            }
        </div>
    );
}

export default PartyDetailsScreen;
