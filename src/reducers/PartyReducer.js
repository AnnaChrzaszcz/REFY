import React, {useState, useEffect} from 'react';


    const initialPartyState = {
        ownerId: '',
        name: 'initial name',
        channels: [{name: 'channel1', number: 0, color: '#9cffb6', playlistURL: '', activeListeners: [], startTime: ''},
            {name: 'channel2', number: 1, color: '#ffb59c', playlistURL: '', activeListeners: [], startTime: ''},
            {name: 'channel3', number: 2, color: '#9cc0ff', playlistURL: '', activeListeners: [], startTime: ''}],
        startTime: null,
        endTime: null,
        coord: null,
    }

    export default function newPartyReducer(state = initialPartyState, action) {
        // The reducer normally looks at the action type field to decide what happens
        switch (action.type) {
            // Do something here based on the different types of actions
            case 'party/setName': {
                // We need to return a new state object
                return {
                    ...state,
                    name: action.payload
                }
            }
            case 'party/setOwnerId': {
                // We need to return a new state object
                return {
                    ...state,
                    ownerId: action.payload
                }
            }

            case 'party/setChannels': {
                // We need to return a new state object
                return {
                    ...state,
                    channels: action.payload
                }
            }
            case 'party/addChannel': { //TODO git?
                // We need to return a new state object
                return {
                    ...state,
                    channels: [...state.channels, action.payload]
                }
            }
            default:
                // If this reducer doesn't recognize the action type, or doesn't
                // care about this specific action, return the existing state unchanged
                return state
        }
    }



