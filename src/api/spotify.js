import SpotifyWebAPI from "spotify-web-api-js";
import Cookies from "js-cookie";

const spotifyApi = new SpotifyWebAPI();

export const getUserInfo = (token) => {
    try{
        spotifyApi.setAccessToken(token);
        return spotifyApi.getMe();
    }
    catch(err){
        console.log(err);
    }
};


export const getPlaylists = (token) => {
    try{
        spotifyApi.setAccessToken(token);
        return spotifyApi.getUserPlaylists();
    }
    catch(err){
        console.log(err);
    }
};


export const storeToken = async (token) => {
    try{
        localStorage.setItem('spotify-token', JSON.stringify(token));
    }
    catch(err) {
        console.log(err);
    }
};

export const getToken = async () => {
    try{
        return Cookies.get('spotifyAuthToken')
        //return JSON.parse(localStorage.getItem('spotify-token'));
    }
    catch(err) {
        console.log(err);
    }
};
