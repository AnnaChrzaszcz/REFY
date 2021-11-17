import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import {
  Switch,
  Route,
    useLocation
} from "react-router-dom";
import {getDeviceId, pausePlayer, removeListener, setDeviceId} from "./api/refy";
import store from "./reducers/Store";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashBoardScreen";
import NearbyPartiesScreen from "./screens/NearbyPartiesScreen";
import PartyDetailsScreen from "./screens/PartyDetailsScreen";
import ChannelDetailsScreen from "./screens/ChannelDetailsScreen";
import CreatePartyScreen from "./screens/CreatePartyScreen";
import CreateChannelScreen from "./screens/CreateChannelScreen";
import MyPartiesScreen from "./screens/MyPartiesScreen";
import SpotifyPlayer from "react-spotify-web-playback";
import {getToken} from "./api/spotify";

function App() {

  const location = useLocation();
  const [removelistenerFlag, setRemovelistenerFlag] = useState(false);
  const channelDetailsPath = '/dashboard/nearbyParties/partyDetails/channelDetails';
    const [token, setToken] = useState(undefined);
    const elementRef = useRef();

  useEffect(() => {
      setRemovelistenerFlag(false);
      const previousURL = store.getState().removeListener.previousURL;
    if(location.pathname === channelDetailsPath){
        store.dispatch({ type: 'removeListener/setChannelNumber', payload: location.state.channel.number });
    }
    if(previousURL === channelDetailsPath){
        store.dispatch({ type: 'removeListener/setIdParty', payload: location.state.party._id });
        setRemovelistenerFlag(true);
    }
      store.dispatch({ type: 'removeListener/setPreviousURL', payload: location.pathname});
  }, [location])

    useEffect(() => {
        if(removelistenerFlag){
            getDeviceId().then(deviceId => {
                pausePlayer(deviceId).then((res) => {
                    console.log(res);
                })
            })
            removeListener(store.getState().removeListener._idParty, store.getState().removeListener.channelNumber).then(party => {
                store.dispatch({ type: 'party/setChannels', payload: party.channels});
            });
        }
    }, [removelistenerFlag])

    useEffect(() => {
        getToken().then(token => {
            setToken(token);
        })
    }, [])


  return (
      <>
          <Switch>
        <Route exact path="/">
          <WelcomeScreen />
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/dashboard">
          <DashboardScreen />
        </Route>
        <Route exact path="/dashboard/partyDetails">
          <PartyDetailsScreen />
        </Route>
        <Route exact path="/dashboard/nearbyParties">
          <NearbyPartiesScreen />
        </Route>
        <Route exact path="/dashboard/nearbyParties/partyDetails">
          <PartyDetailsScreen />
        </Route>
        <Route exact path="/dashboard/nearbyParties/partyDetails/channelDetails">
          <ChannelDetailsScreen />
        </Route>
        <Route exact path="/dashboard/createParty">
          <CreatePartyScreen />
        </Route>
        <Route exact path="/dashboard/createParty/createChannel">
          <CreateChannelScreen />
        </Route>
        <Route exact path="/dashboard/myParties">
          <MyPartiesScreen />
        </Route>
      </Switch>
          <div style={{visibility: 'hidden'}}>
              {token &&
              <SpotifyPlayer
                  ref={elementRef}
                  token={token}
                  autoPlay={true}
                  styles={{
                      display: 'none',
                      height: '0px',
                  }}

                  callback={(state) => {
                      const divElement = elementRef.current;
                      const deviceId = divElement.state.deviceId
                      setDeviceId(deviceId).then(r => {})
                  }
                  }
              />
              }
          </div>
          </>
  );
}

export default App;
