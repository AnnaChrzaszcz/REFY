import React from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import 'react-spotify-auth/dist/index.css' // if using the included styles
import {getUserInfo} from "../api/spotify";
import {createUser as createRefyUser,} from "../api/refy";
import '../components/RefyButton.css';
const LoginScreen = () => {

    const createUser = (token) => {
        getUserInfo(token).then(me => {
            createRefyUser(me.display_name).then(createdUser => {
               console.log(createdUser);
            })
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
        <div className='loginScreen'>
            <div className='animation' />
            {getAccessToken() ? (
                <Redirect to="/dashboard" />
            ) : (
                <SpotifyAuth
                    className='loginButton'
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

//            <img style={{height: height*0.7, display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '100%'}} src={login} alt="animation" />

export default LoginScreen;
