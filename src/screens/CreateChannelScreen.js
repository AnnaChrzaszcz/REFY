import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {getPlaylists, getToken} from "../api/spotify";
import Cookies from "js-cookie";

const CreateChannelScreen = () => {
    let location = useLocation();
    const [channel, setChannel] = useState({});
    const [playlists, setPlaylists] = useState([]);
    const [showPlaylist, setShowPlaylist] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    useEffect(() => {
        console.log('use effect')
        setChannel(location.state);
        getToken().then(token => {
            getPlaylists(token).then(userPlaylists => {
                setPlaylists(userPlaylists.items);
                console.log(userPlaylists);
            })
        })
    }, [])

    useEffect(() => {
        console.log('use effect');
        console.log(channel);
    }, [channel])


    const selectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);
        setChannel({...channel, playlistURL: playlist.uri})
    }

    const playlistItems = playlists.map((playlist) =>
        <li key={playlist.id}>
            <button onClick={() => selectPlaylist(playlist)}>{playlist.name}</button>
        </li>
    );

    const nameChangeHandler = (event) => {
        setChannel({...channel, name: event.target.value})
    }

    return (
        <div style={{backgroundColor: channel.color}} className='app'>
            <h1>Create Channel Screen</h1>
            <form>
                <p>Enter channel name:</p>
                <input
                    type='text'
                    value={channel?.name}
                    onChange={nameChangeHandler}
                />
            </form>
            <p>Select playlist:</p>
            <br/>
            {showPlaylist ?
                <ul>
                    {playlistItems}
                </ul>
                : null
            } <p>Selected playlist: {channel.playlistURL ? channel.playlistURL : ''}</p>
            <Link to={{pathname: '/dashboard/createParty', state: channel}}>
                <button>Create Channel</button>
            </Link>
        </div>
    );
}

export default CreateChannelScreen;
