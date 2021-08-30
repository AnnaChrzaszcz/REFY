import React from 'react';

const initialRemoveListener = {
    _idParty: '',
    channelNumber: '',
    previousURL: ''
}

export default function removeListenerReducer(state = initialRemoveListener, action) {
    switch (action.type) {
        case 'removeListener/setIdParty': {
            return {
                ...state,
                _idParty: action.payload
            }
        }
        case 'removeListener/setChannelNumber': {
            return {
                ...state,
                channelNumber: action.payload
            }
        }
        case 'removeListener/setPreviousURL': {
            return {
                ...state,
                previousURL: action.payload
            }
        }
        default:
            return state
    }
}



