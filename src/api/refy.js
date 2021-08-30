import axios from 'axios';
import {ipAddress} from "../secretApiUrl";

export const instance =  axios.create({
    baseURL: `${ipAddress}`
});


instance.interceptors.request.use(
    async (config) => {
        //const token = await getToken();
        const token = null;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);


export const createUser = async (spotifyId) => {
    try{
        const response = await instance.post('/user', {spotifyId});
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};

export const createChannel = async (channel) => {
    try {
        console.log(channel)
        const response = await instance.post('/channel', channel);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};

export const createParty = async (newParty) => {
    try{
        console.log(newParty);
        const response = await instance.post('/party', newParty);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};


export const addNewListener = async (_idParty, channelNumber) => {
    try{
        let user = await getUser();
        let spotifyId = user.spotifyId;
        console.log('add new listener',spotifyId, _idParty, channelNumber);
        const response = await instance.post('party/channel/addNewListener', {_idParty, spotifyId, channelNumber});
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};

export const removeListener = async (_idParty, channelNumber) => {
    try{
        let user = await getUser();
        let spotifyId = user.spotifyId;
        console.log('remove listemer',spotifyId ,_idParty, channelNumber);
        const response = await instance.post('party/channel/removeListener', {_idParty, spotifyId, channelNumber});
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};

export const getNearbyParties = async () => {
    try{
        const response = await instance.get('/party/findAll');
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};

export const getUserParties = async () => {
    try{
        const user = await getUser();
        const response = await instance.get('/party/findByUser',
            {
            params: {
                id: user._id
            }
        });
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
};

export const storeUser = async (user) => {
    try{
        localStorage.setItem('user', JSON.stringify(user));
        console.log('user przechowywany refy.js' + user.spotifyId)
    }
    catch(err) {
        console.log(err);
    }
};

export const getUser = async () => {
    try{
        return JSON.parse(localStorage.getItem('user'));
    }
    catch(err) {
        console.log(err);
    }
};
