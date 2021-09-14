import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {getUser, createParty} from "../api/refy";
import ChannelPreview from "../components/ChannelPreview";
import store from "../reducers/Store";
import Header from "../components/Header";
import '../styles/CreateParty.css';
import {FiMapPin} from "react-icons/fi";
import {RefyButton} from "../components/RefyButton";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const CreatePartyScreen = () => {

    let location = useLocation();
    const [user, setUser] = useState(undefined);
    const [updatedChannel, setUpdatedChannel] = useState({})
    const [partyName, setPartyName] = useState(store.getState().newParty.name);
    const [nameWarningVisible, setNameWarningVisible] = useState(false);
    const [positionWarningVisible, setPositionWarningVisible] = useState(false);
    const history = useHistory();
    const [positionEnabled, setPositionEnabled] = useState(store.getState().newParty.coord !== null);
    const [positionColor, setPositionColor] = useState('white');
    const [spinnerVisible, setSpinnerVisible] = useState(false);

    useEffect(() => {
        if(location.state){
            setUpdatedChannel(location.state);
            updateChannels(location.state);
        }
        getUser().then(user => {
            setUser(user);
            store.dispatch({ type: 'party/setOwnerId', payload: user._id });
        })
    }, []);

    useEffect(() => {
        setPositionColor(positionEnabled ? '#ADE8FF' : 'white');
        if(positionEnabled){
            setSpinnerVisible(true);
            navigator.geolocation.getCurrentPosition(position => {
                let coord = {latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy}
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                store.dispatch({ type: 'party/setCoord', payload: coord});
                setSpinnerVisible(false);
            })
        }
        else{
            store.dispatch({ type: 'party/setCoord', payload: null});
        }
    }, [positionEnabled])

    const updateChannels = (newChannel) => {
        let newChannels = [];
        store.getState().newParty.channels.forEach(channel => {
            if(channel.number !== newChannel.number){
                newChannels.push(channel)
            }
            else{
                newChannels.push(newChannel);
            }
        })
        store.dispatch({ type: 'party/setChannels', payload: newChannels });
    }

    const channelItemComponent = store.getState().newParty.channels.map((channel) =>
        <div key={channel.number}>
            <ChannelPreview channel={channel}/>
        </div>
    );

    const nameChangeHandler = (event) => {
        setPartyName(event.target.value);
        store.dispatch({ type: 'party/setName', payload: event.target.value });
    }

    const createNewParty = () => {
        if(partyName.length > 0){
            if(positionEnabled){
                createParty(store.getState().newParty).then(newParty => {
                    console.log(newParty);
                    history.push('/dashboard/partyDetails', {newParty: true, party: newParty})
                    store.dispatch({ type: 'party/resetState'});
                })
            }
            else{
                setPositionWarningVisible(true);
                setNameWarningVisible(false);
            }
        }
        else{
            if(positionEnabled){
                setNameWarningVisible(true);
                setPositionWarningVisible(false);
            }
            else{
                setNameWarningVisible(true);
                setPositionWarningVisible(true);
            }
        }
    }

    const enableLocation = () => {
        setPositionEnabled(!positionEnabled);
    }

    const inputContainer = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


    return (
        <div className='createParty-Screen'>
            <Header headerText="Create Party"/>
            <div className='createParty-container'>
                {spinnerVisible &&
                <div style={{position: 'fixed', width: '100%', height: '70%', display: 'flex', alignItems: 'center' ,justifyContent: 'center'}}>
                    <Loader
                        type="Oval"
                        color="#ADE8FF"
                        height='100'
                        width='100'
                    />
                </div>
                }
                <p style={{color: '#ADE8FF',  margin: '2% 15px', fontSize: '4vw'}}>Enter party name:</p>
                <div style={inputContainer}>
                    <input
                        type='text'
                        style={{backgroundColor: 'black',
                            color: 'white',
                            borderWidth: '0 0 1px 0',
                            borderBottomColor: '#ADE8FF',
                            width: '70%',
                            margin: '2% 15px', fontSize: '5vw'}}
                        placeholder="ex. Anna's Surprise Party"
                        value={partyName}
                        onChange={nameChangeHandler}
                    />
                <FiMapPin onClick={enableLocation} color={positionColor} size='4vh' style={{marginRight: '6%'}}/>
                </div>
                {
                    positionWarningVisible &&
                    <text style={{color: 'red',  margin: '0 15px', fontSize: '2.5vh'}}>You need to access location!</text>
                }
                {
                    nameWarningVisible &&
                    <text style={{color: 'red',  margin: '0 15px', fontSize: '2.5vh'}}>You need to enter name!</text>
                }
                <div className='channel-container-createParty'>
                    {channelItemComponent}
                </div>
                <br/>
                <div>
                    <RefyButton id="createParty" text="Create Party" onSubmit={createNewParty} disabled={spinnerVisible}/>
                </div>
            </div>
        </div>
    );
}


export default CreatePartyScreen;
