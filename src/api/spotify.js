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

export const getToken = async () => {
    try{
        return Cookies.get('spotifyAuthToken')
    }
    catch(err) {
        console.log(err);
    }
};
