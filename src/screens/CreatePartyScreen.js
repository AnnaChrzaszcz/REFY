import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import Cookies from 'js-cookie'
import {createChannel, createParty, getUser} from "../api/refy";
import ChannelPreview from "../components/ChannelPreview";
import store from "../reducers/Store";

const CreatePartyScreen = () => {

    let location = useLocation();
    const [user, setUser] = useState(undefined);
    const [updatedChannel, setUpdatedChannel] = useState({})
    const [partyName, setPartyName] = useState(store.getState().newParty.name);


    useEffect(() => {
        if(location.state){
            console.log('location state mordy')
            setUpdatedChannel(location.state);
            updateChannels(location.state);
        }
        getUser().then(user => {
            setUser(user);
            store.dispatch({ type: 'party/setOwnerId', payload: user._id });
        })
    }, []);

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
        <li key={channel.number}>
            <ChannelPreview channel={channel}/>
        </li>
    );

    const nameChangeHandler = (event) => {
        setPartyName(event.target.value);
        store.dispatch({ type: 'party/setName', payload: event.target.value });
    }

    const createNewParty = () => {
        createParty(store.getState().newParty).then(newParty => {
            console.log(newParty);
        })
    }

    return (
        <div className='app'>
            <h1>CreatePartyScreen</h1>
            <form>
                <p>Enter party name:</p>
                <input
                type='text'
                value={partyName}
                onChange={nameChangeHandler}
                />
            </form>
            <ul>
                {channelItemComponent}
            </ul>
            <br/>
            <Link to='/dashboard/partyDetails'>
                <button onClick={createNewParty}>Create Party</button>
            </Link>
        </div>
    );
}

export default CreatePartyScreen;
