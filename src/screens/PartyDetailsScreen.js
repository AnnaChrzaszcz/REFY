import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import '../styles/PartyDetails.css';
import Channel from "../components/Channel";
import {FiArrowLeft} from "react-icons/fi";
import { useHistory } from "react-router-dom";

const PartyDetailsScreen = () => {

    let location = useLocation();
    const [party, setParty] = useState({});
    const history = useHistory();

    useEffect(() => {
        if(location.state.party){
            setParty(location.state.party);
        }
    }, [])

    const goBack = () => {
        if(location.state.newParty){
            history.push('/dashboard');
        }
        else{
            history.goBack();
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
