import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => { //TODO cos on mi tu swiruje
    console.log(location);
    if(location.action === 'POP' && location.location.pathname === '/dashboard/nearbyParties/partyDetails/channelDetails'){
        console.log('OPUSZCZAM CHANNEL DETAILS');
    }
})

export default history
