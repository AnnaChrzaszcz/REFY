import React, {useEffect, useState} from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { Redirect } from "react-router-dom";
import { SpotifyApiContext} from 'react-spotify-api'
import Cookies from 'js-cookie'
import SpotifyPlayer from 'react-spotify-web-playback';
import 'react-spotify-auth/dist/index.css' // if using the included styles
import {getUserInfo, getPlaylists} from "../api/spotify";
import {createUser as createRefyUser, storeUser} from "../api/refy";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";


const LoginScreen = () => {
    const token = Cookies.get('spotifyAuthToken');
    //const token = localStorage.getItem('spotifyAuthToken');
    const [playlists, setPlaylists] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState('spotify:playlist:12vwfmvhakMSJ7biuCwc0w');


    const selectPlaylist = (playlist) => {
        console.log('selected playlist: ' + playlist.name)
        console.log(playlist.uri);
        setSelectedPlaylist(playlist.uri);
    }

    const playlistItems = playlists.map((playlist) =>
        <li key={playlist.id}>
            <button onClick={() => selectPlaylist(playlist)}>{playlist.name}</button>
        </li>
    );

    const createUser = (token) => {
        getUserInfo(token).then(me => {
            setUser(me.display_name);
            createRefyUser(me.display_name).then(createdUser => {
                storeUser(createdUser).then(() => {
                })
            })
        })
    }

    const showPlaylists = () => {
        getPlaylists(token).then(userPlaylists => {
            setPlaylists(userPlaylists.items);
        })
    }

    const getAccessToken = () => {
        let uri = document.URL.split("#access_token=")

        if(uri.length > 1){

            let params = uri[1].split("&")

            if(params.length > 1){
                let token = params[0]
                Cookies.set('spotifyAuthToken', token)
                console.log(token)
                createUser(token)
                return true
            }
        }

        return false
    }

    return (
        <div className='app'>
            {getAccessToken() ? (
                <Redirect to="/dashboard" />
                // <SpotifyApiContext.Provider value={token}>
                //     <button onClick={createUser}>get user info</button>
                //     <br/>
                //     <Link to='/dashboard'>
                //     <button>go to dashboard</button>
                //     </Link>
                //     <br/>
                //     {user ? user : null}
                //     <br/>
                //     <button onClick={showPlaylists}>get user playlists</button>
                //     <ul>
                //         {playlistItems}
                //     </ul>
                //     <p>You are authorized with Spotify</p>
                //     <p>From cookie spotifyAuthToken:  {token}</p>
                //     <SpotifyPlayer
                //         token={token}
                //         uris={[`${selectedPlaylist}`]}
                //     />
                // </SpotifyApiContext.Provider>
            ) : (
                <SpotifyAuth
                    redirectUri='http://localhost:3000/login'
                    title="Login with Spotify"
                    //onAccessToken={(token) => Cookies.set('spotify-token', token)}
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

export default LoginScreen;
