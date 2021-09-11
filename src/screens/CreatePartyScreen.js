import React, {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import Cookies from 'js-cookie'
import {createChannel, createParty, getUser} from "../api/refy";
import ChannelPreview from "../components/ChannelPreview";
import store from "../reducers/Store";
import Header from "../components/Header";
import '../styles/CreateParty.css';
import {RefyButton} from "../components/RefyButton";

const CreatePartyScreen = () => {

    let location = useLocation();
    const [user, setUser] = useState(undefined);
    const [updatedChannel, setUpdatedChannel] = useState({})
    const [partyName, setPartyName] = useState(store.getState().newParty.name);
    const [nameWarningVisible, setNameWarningVisible] = useState(false);
    const history = useHistory();


    useEffect(() => {
        if(location.state){
            console.log('location state mordy')
            console.log(location.state);
            setUpdatedChannel(location.state);
            updateChannels(location.state);
        }
        getUser().then(user => {
            setUser(user);
            store.dispatch({ type: 'party/setOwnerId', payload: user._id });
        })
    }, []);

    const createParty = () => {
    }

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
        console.log(newChannels);
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
            createParty(store.getState().newParty).then(newParty => {
                console.log(newParty);
                history.push('/dashboard/partyDetails')
            })
        }
        else{
            setNameWarningVisible(true);
        }
    }

    return (
        <div className='createParty-Screen'>
            <Header headerText="Create Party"/>
            <div className='createParty-container'>
                <p style={{color: '#ADE8FF',  margin: '2% 15px'}}>Enter party name:</p>
                    <input
                        type='text'
                        style={{backgroundColor: 'black',
                            color: 'white',
                            borderWidth: '0 0 1px 0',
                            borderBottomColor: '#ADE8FF',
                            width: '70%',
                            margin: '2% 15px', fontSize: '3vh'}}
                        placeholder="ex. Anna's Surprise Party"
                        value={partyName}
                        onChange={nameChangeHandler}
                    />
                {
                    nameWarningVisible &&
                    <text style={{color: 'red',  margin: '0 15px', fontSize: '2.5vh'}}>You need to enter name!</text>
                }
                <div className='channel-container-createParty'>
                    {channelItemComponent}
                </div>
                <br/>
                <div>
                    <RefyButton id="createParty" text="Create Party" onSubmit={createNewParty}/>
                </div>
            </div>
        </div>
    );
}

//createNewParty

export default CreatePartyScreen;
