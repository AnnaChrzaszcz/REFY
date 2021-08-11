import React, {useEffect, useState} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import {getToken} from "../api/spotify";
import {useLocation} from "react-router-dom";
import { Prompt } from 'react-router'

const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
        // Show prompt based on state
        if (showExitPrompt) {
            console.log('INIT BEFORE')
            const e = event || window.event;
            e.preventDefault();
            if (e) {
                e.returnValue = ''
            }
            return '';
        }
    };
};

const ChannelDetailsScreen = () => {
    let location = useLocation();
    const [token, setToken] = useState(undefined);
    const [channel, setChannel] = useState({});
    const [showExitPrompt, setShowExitPrompt] = useState(true);

/*
    window.onload = function() {
        initBeforeUnLoad(showExitPrompt);
    };

    useEffect(() => {
        initBeforeUnLoad(showExitPrompt);
    }, []);*/

    useEffect(() => {
        //console.log(window.location);
        setChannel(location.state);
        getToken().then(token => {
            setToken(token);
        })
    },[])


    return (
        <div className='app'>
            <h1>Channel Details Screen</h1>
            <Prompt
                message={(location, action) => {
                    if (action === 'POP') {
                        console.log("Backing up...")
                    }

                    return location.pathname.startsWith("/app")
                        ? true
                        : `Are you sure you want to go to ${location.pathname}?`
                }}
            />
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
