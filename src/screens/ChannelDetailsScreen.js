import React, {useEffect, useState} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import {getToken} from "../api/spotify";
import {useLocation} from "react-router-dom";

const ChannelDetailsScreen = () => {
    let location = useLocation();
    const [token, setToken] = useState(undefined);
    const [channel, setChannel] = useState({});

    useEffect(() => {
        setChannel(location.state);
        getToken().then(token => {
            setToken(token);
        })
    },[])


    return (
        <div className='app'>
            <h1>Channel Details Screen</h1>
            {token &&
            <SpotifyPlayer
                token={token}
                autoPlay={true}
                uris={[`${channel.playlistURL}`]}
            />
            }
        </div>
    );
}

export default ChannelDetailsScreen;
