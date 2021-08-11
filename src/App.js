import './App.css';
import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
    useHistory,
    useLocation
} from "react-router-dom"; //TODO nie dzialaja te gowna

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PlayerScreen from "./screens/PlayerScreen";
import DashboardScreen from "./screens/DashBoardScreen";
import NearbyPartiesScreen from "./screens/NearbyPartiesScreen";
import PartyDetailsScreen from "./screens/PartyDetailsScreen";
import ChannelDetailsScreen from "./screens/ChannelDetailsScreen";
import CreatePartyScreen from "./screens/CreatePartyScreen";
import CreateChannelScreen from "./screens/CreateChannelScreen";
import MyPartiesScreen from "./screens/MyPartiesScreen";
import root from "./root";

function App() {

  return (
    <Router history={root}>
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
        <Route exact path="/player">
          <PlayerScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
