import React, {useState, useLayoutEffect, useEffect} from 'react';
import {getToken} from "../api/spotify";
import {useHistory, useLocation} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import '../styles/ChannelDetails.css';
import {addSpotifyCredentials, getDeviceId} from "../api/refy";

const ChannelDetailsScreen = () => {
    let location = useLocation();
    const [token, setToken] = useState(undefined);
    const [channel, setChannel] = useState({});
    const [partyId, setPartyId] = useState({});
    const history = useHistory();

    useLayoutEffect(() => {
        setChannel(location.state.channel);
        setPartyId(location.state.partyId);
        getToken().then(token => {
            setToken(token);
        })
    }, [])

    useEffect(() => {
        getDeviceId().then(deviceId => {
            addSpotifyCredentials(deviceId, token, partyId, channel.number).then(r => {
                console.log(r)
            })
        })
    })

    const goBack = () => {
        history.goBack();
    }

    return (
        <div style={{backgroundColor: channel.color, height: '100vh'}}>
            <FiArrowLeft onClick={goBack}  color='white' size='10%' style={{margin: '8% 5%'}}/>
            <p style={{marginBottom: '2vh', color: 'white', textAlign: 'center', fontSize: '5vh', marginTop: '15%'}}>{channel.number}</p>
            <p style={{ marginTop: '0',color: 'white', textAlign: 'center', fontSize: '5vh'}}>{channel.name}</p>
            <div style={{marginTop: '50%'}}>
            </div>
        </div>
    );
}

export default ChannelDetailsScreen;
