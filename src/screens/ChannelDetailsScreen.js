import React, {useEffect, useState, useRef} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import {getToken} from "../api/spotify";
import {useLocation} from "react-router-dom";

const ChannelDetailsScreen = () => {
    let location = useLocation();
    const [token, setToken] = useState(undefined);
    const [channel, setChannel] = useState({});
    const [flag, setFlag] = useState(false);
    const elementRef = useRef();
    const newPosition = 0.20;

    useEffect(() => {
        setChannel(location.state);
        getToken().then(token => {
            setToken(token);
            const divElement = elementRef.current;
            divElement.state.position = 123;
            console.log(divElement);
             /*divElement.updateState(prevState => ({
                 ...prevState,
                 position: 123
             }), () => {
                 console.log('elko')
                 console.log(divElement);
             });*/
        })
    },[])

    return (
        <div className='app'>
            <h1>Channel Details Screen</h1>
            {token &&
            <SpotifyPlayer
                ref={elementRef}
                token={token}
                autoPlay={true}
                uris={[`${channel.playlistURL}`]}
                callback={(state) => {
                    console.log(state)
                }}
            />
            }
        </div>
    );
}

export default ChannelDetailsScreen;
