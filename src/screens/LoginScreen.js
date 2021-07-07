import React from 'react';
import logo from "../assets/logoTmp.png";
import weConnect from "../assets/weConnect.png";
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import SpotifyPlayer from 'react-spotify-web-playback';
import 'react-spotify-auth/dist/index.css' // if using the included styles
import {BrowserRouter as Router} from "react-router-dom";


const WelcomeScreen = () => {
    const token = Cookies.get('spotifyAuthToken')

    return (
        <div className='app'>
            <img src={logo} alt="logo" />
            <br></br>
            <img src={weConnect} alt="weConnect" />
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    {/* Your Spotify Code here */}
                    <p>You are authorized with token: {token}</p>
                    <SpotifyPlayer
                        token={token}
                        uris={['spotify:track:48mFVRJs4KsIhpJlotiKDa']}
                    />
                </SpotifyApiContext.Provider>
            ) : (
                <SpotifyAuth
                    redirectUri='http://localhost:3000'
                    title="Login with Spotify"
                    clientID='5b711cc842ee48499417ab313fe85968'
                    scopes={[Scopes.userReadPrivate,
                            Scopes.userModifyPlaybackState,
                            Scopes.userReadPlaybackState,
                            Scopes.streaming,
                            Scopes.userReadEmail]}
                />
            )}
        </div>
    );
}

export default WelcomeScreen;
