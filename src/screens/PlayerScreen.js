import React, {useEffect, useState} from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import SpotifyPlayer from 'react-spotify-web-playback';
import 'react-spotify-auth/dist/index.css' // if using the included styles

const PlayerScreen = () => {
    const token = Cookies.get('spotifyAuthToken');
    const token1 = localStorage.getItem('spotifyAuthToken');


    /*useEffect(() => {
        //setToken( Cookies.get('spotify-token'));
        setToken(localStorage.getItem('spotify-token'))
        console.log(token1);
    }, [])*/

    return (
        <div className='app'>
            {token1 ? <p>From cookie:  {token1}</p> : null}
            {token1 ? (
                <SpotifyApiContext.Provider value={token}>
                    {/* Your Spotify Code here */}
                    <SpotifyPlayer
                        token={token}
                        uris={['spotify:track:48mFVRJs4KsIhpJlotiKDa']}
                    />
                </SpotifyApiContext.Provider>
            ) : (
                <p>Nie jestes zalogowany</p>
            )}
        </div>
    );
}

export default PlayerScreen;
