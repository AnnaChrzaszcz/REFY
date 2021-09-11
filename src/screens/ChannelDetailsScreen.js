import React, {useEffect, useState, useRef} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import {getToken} from "../api/spotify";
import {useHistory, useLocation} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import '../styles/ChannelDetails.css';

const ChannelDetailsScreen = () => {
    let location = useLocation();
    const [token, setToken] = useState(undefined);
    const [channel, setChannel] = useState({});
    const elementRef = useRef();
    const history = useHistory();

    useEffect(() => {
        setChannel(location.state);
        getToken().then(token => {
            setToken(token);
            const divElement = elementRef.current;
            divElement.state.position = 123;
            console.log(divElement);
             /*divElement.updateState(prevState => ({
                 ...prevState,
                 position: 123
             }), () => {
                 console.log('elko')
                 console.log(divElement);
             });*/
        })
    },[])

    const goBack = () => {
        history.goBack();
    }

    return (
        <div style={{backgroundColor: channel.color, height: '100vh'}}>
            <FiArrowLeft onClick={goBack}  color='white' size='10%' style={{margin: '8% 5%'}}/>
            <p style={{marginBottom: '2vh', color: 'white', textAlign: 'center', fontSize: '5vh', marginTop: '15%'}}>{channel.number}</p>
            <p style={{ marginTop: '0',color: 'white', textAlign: 'center', fontSize: '5vh'}}>{channel.name}</p>
            <div style={{marginTop: '50%'}}>
                {token &&
                <SpotifyPlayer
                    ref={elementRef}
                    token={token}
                    autoPlay={true}
                    styles={{bgColor: channel.color,
                        sliderColor: 'white',
                        color: 'white',
                        activeColor: 'white',
                        trackArtistColor: 'white',
                        trackNameColor: 'white',
                        sliderHandleColor: 'white',
                        sliderTrackColor: 'rgba(0,0,0,0.05)',
                        height: '13vh',
                       }}
                    uris={[`${channel.playlistURL}`]}
                    callback={(state) => {
                        console.log(state)
                    }}
                />
                }
            </div>
        </div>
    );
}

export default ChannelDetailsScreen;
