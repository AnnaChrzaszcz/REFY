import '../styles/NearbyParties.css';
import {FiChevronRight, FiCircle} from "react-icons/fi";
import React from "react";

export default function PartyPreview({buttonText, index, channels, myParty, endTime}) {

    const getDelay = () => {
        return (index * 0.2) + 's';
    }

    const activeListeners = () => {
        let activeListeners = 0;
        channels.forEach(channel => {
            activeListeners += channel.activeListeners?.length;
        })
        return activeListeners;
    }

    const myPartyPreview = {
        borderWidth: '1px',
        borderRadius: '6px',
        borderColor: 'white',
        borderStyle: 'groove',
    margin: '3% 3%',
    display: 'flex',
    flexDirection: 'column',
    padding: '8% 4%',
    backgroundColor: 'rgba(0, 119, 133, 0.9)',
    animationName: 'example',
        animationDuration: '2s',
    animationDelay: getDelay(),
    position: 'relative',
        animationFillMode: 'backwards'
    };

    return (
        <div style={myPartyPreview}>
            {myParty &&
            <FiCircle style={{position: 'absolute', right: '3%', top: '5%'}} color={endTime ? 'red' : 'green'} fill={endTime ? 'red' : 'green'} size='7%'/>
            }
            <text style={{color: 'white', fontSize: '4vh', margin: '4% 0'}}>{buttonText}</text>
            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>Bar Zamieszanie</text>
            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>{activeListeners() === 1 ? '1 user' : activeListeners() + ' users'}</text>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '5% 0'}}>
                <text className='join' style={{color: 'white', fontSize: '4vh', textAlign: 'center'}}>{myParty ? 'See details' : 'Join now!'}</text>
                <FiChevronRight color='white' size='9%' style={{margin: '0 4%'}}/>
            </div>
        </div>
    );
}
