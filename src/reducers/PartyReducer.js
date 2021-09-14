import React from 'react';

    const initialPartyState = {
        ownerId: '',
        name: '',
        channels: [{name: '', number: 0, color: '#44AB9E', playlistURL: '', activeListeners: [], startTime: null},
            {name: '', number: 1, color: '#FF7575', playlistURL: '', activeListeners: [], startTime: null},
            {name: '', number: 2, color: '#9DB847', playlistURL: '', activeListeners: [], startTime: null}],
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
            case 'party/setCoord': {
                // We need to return a new state object
                return {
                    ...state,
                    coord: action.payload
                }
            }

            case 'party/setChannels': {
                // We need to return a new state object
                return {
                    ...state,
                    channels: action.payload
                }
            }
            case 'party/resetState': {
                // We need to return a new state object
                return {
                    ...initialPartyState
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



