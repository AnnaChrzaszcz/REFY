import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import {getPlaylists, getToken} from "../api/spotify";
import '../styles/CreateChannel.css';
import Header from "../components/Header";
import {RefyButton} from "../components/RefyButton";
import {FiCheck} from "react-icons/fi";

const CreateChannelScreen = () => {
    let location = useLocation();
    const [channel, setChannel] = useState({});
    const [playlists, setPlaylists] = useState([]);
    const [nameWarningVisible, setNameWarningVisible] = useState(false);
    const [playlistWarningVisible, setPlaylistWarningVisible] = useState(false);
    const iconColor = 'rgba(255,255,255, 0.3';
    const history = useHistory();

    const playlistRow = {
        borderBottomColor: 'rgba(255,255,255, 0.3)',
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    useEffect(() => {
        setChannel(location.state);
        getToken().then(token => {
            getPlaylists(token).then(userPlaylists => {
                setPlaylists(userPlaylists.items);
                console.log(userPlaylists);
            })
        })
    }, [])

    useEffect(() => {
        console.log(channel);
    }, [channel])

    const createChannel = () => {
        if(channel.name.length > 0){
            if(channel.playlistURL.length > 0){
                history.push('/dashboard/createParty', channel)
            }
            else{
                setPlaylistWarningVisible(true);
                setNameWarningVisible(false);
            }
        }
        else{
            if(channel.playlistURL.length > 0){
                setNameWarningVisible(true);
                setPlaylistWarningVisible(false);
            }
            else{
                setPlaylistWarningVisible(true);
                setNameWarningVisible(true);
            }
        }
    }


    const selectPlaylist = (playlist) => {
        setChannel({...channel, playlistURL: playlist.uri})
    }

    const playlistItems = playlists.map((playlist) =>
        <div style={playlistRow} key={playlist.id} onClick={() => selectPlaylist(playlist)}>
                <p style={{color: playlist.uri === channel?.playlistURL ? '#ADE8FF' : 'white'}}>{playlist.name}</p>
                <FiCheck style={{margin: '0 5%'}} color={playlist.uri === channel?.playlistURL ? '#ADE8FF' : iconColor} size='8%' />
        </div>
    );

    const nameChangeHandler = (event) => {
        setChannel({...channel, name: event.target.value})
    }

    return (
        <div className='createChannelScreen'>
            <Header headerText="Create Channel"/>
            <div className='createChannel-container'>
                <p style={{color: '#ADE8FF',  margin: '2% 15px'}}>Enter channel name:</p>
                <input
                    type='text'
                    style={{backgroundColor: 'black',
                        color: 'white',
                        borderWidth: '0 0 1px 0',
                        borderBottomColor: '#ADE8FF',
                        width: '70%',
                        margin: '2% 15px', fontSize: '3vh'}}
                    placeholder="ex. Disco on the corner"
                    value={channel?.name}
                    onChange={nameChangeHandler}
                />
                    {
                        nameWarningVisible &&
                       <p style={{color: 'red',  margin: '0 15px', fontSize: '2.5vh'}}>You need to enter name!</p>
                    }
                <p style={{color: '#ADE8FF',  margin: '7% 0 0 15px', fontSize: '3vh'}}>Select playlist:</p>
                    {
                        playlistWarningVisible &&
                        <p style={{color: 'red',  margin: '0 15px', fontSize: '2.5vh'}}>You need to select playlist!</p>
                    }
                <br/>
                    <div className="playlistContainer">
                        {playlistItems}
                    </div>
                <div onClick={createChannel}>
                    <RefyButton id="createParty" text="Create Channel" />
                </div>
            </div>
        </div>
    );
}

/*<Link to={{pathname: '/dashboard/createParty', state: channel}}>
    <RefyButton id="createParty" text="Create Channel" />
</Link>*/

export default CreateChannelScreen;
