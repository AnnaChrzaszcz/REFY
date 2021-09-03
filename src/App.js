import './App.css';
import React, {useEffect, useState} from 'react';
import {
  Switch,
  Route,
    useLocation
} from "react-router-dom";
import {removeListener} from "./api/refy";
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

function App() {

  const location = useLocation();
  const [removelistenerFlag, setRemovelistenerFlag] = useState(false);
  const channelDetailsPath = '/dashboard/nearbyParties/partyDetails/channelDetails';

  useEffect(() => {
      setRemovelistenerFlag(false);
      const previousURL = store.getState().removeListener.previousURL;
    if(location.pathname === channelDetailsPath){
        store.dispatch({ type: 'removeListener/setChannelNumber', payload: location.state.number });
    }
    if(previousURL === channelDetailsPath){
        store.dispatch({ type: 'removeListener/setIdParty', payload: location.state._id });
        setRemovelistenerFlag(true);
    }
      store.dispatch({ type: 'removeListener/setPreviousURL', payload: location.pathname});
  }, [location])

    useEffect(() => {
        if(removelistenerFlag){
            removeListener(store.getState().removeListener._idParty, store.getState().removeListener.channelNumber).then(party => {
                console.log(party);
            });
        }
    }, [removelistenerFlag])


  return (
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
  );
}

export default App;
