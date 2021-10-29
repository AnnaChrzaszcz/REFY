import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {getNearbyParties} from "../api/refy";
import '../styles/NearbyParties.css';
import PartyPreview from "../components/PartyPreview";
import Header from "../components/Header";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'leaflet/dist/leaflet.css';
import {CircleMarker, MapContainer, Popup, TileLayer} from 'react-leaflet'
import LocationMarker from "../components/LocationMarker";
import Loader from "react-loader-spinner";

const NearbyPartiesScreen = () => {

    const [nearbyParties, setNearbyParties] = useState([]);
    const [myDefaultIndex, setMyDefaultIndex] = useState(undefined);
    const [userPosition, setUserPosition] = useState(undefined);
    const [spinnerVisible, setSpinnerVisible] = useState(true);
    let location = useLocation();

    useEffect(() => {
        getUserPosition();
    }, [])

    const getUserPosition = () => {
        setSpinnerVisible(true);
            navigator.geolocation.getCurrentPosition(position => {
                console.log('pobieram pozycje');
                const coord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                setUserPosition(coord);
                setSpinnerVisible(false);
                getNearbyParties(coord).then(parties => {
                    setNearbyParties(parties);
                })
            })
    }

    useLayoutEffect(() => {
        if(location.state?.defaultIndex === 1){
            setMyDefaultIndex(1);
        }
        else{
            setMyDefaultIndex(0);
        }
    }, [])

    const partiesItems = nearbyParties.map((party, index) =>
            <Link key={party._id} style={{ textDecoration: 'none' }} to={{pathname: '/dashboard/nearbyParties/partyDetails', state: {newParty: false, party: party, fromMap: false}}}>
                <PartyPreview channels={party.channels} buttonText={party.name} index={index}/>
            </Link>
    );

    const markerItems = nearbyParties.map((party, index) => {
        if(party.coord){
            return (
                <CircleMarker key={party._id} color='purple' fillOpacity={0.5} center={[party.coord.latitude, party.coord.longitude]}>
                    <Popup className='myPopup'>
                        <Link key={party._id} style={{ textDecoration: 'none' }} to={{pathname: '/dashboard/nearbyParties/partyDetails', state: {newParty: false, party: party, fromMap: true}}}>
                        <div style={{display: 'flex', flexDirection: 'column', padding: '0 4%'}}>
                            <text style={{color: 'white', fontSize: '3.5vh', margin: '4% 0'}}>{party.name}</text>
                            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>Bar Zamieszanie</text>
                            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>x users</text>
                            <text className='join' style={{color: 'white', fontSize: '3.5vh', textAlign: 'center', margin: '5% 0'}}>Join now!</text>
                        </div>
                        </Link>
                    </Popup>
                </CircleMarker>
            )
        }
        else return null;
    }
    );

    const myStyles = {
        top: '9vh',
        position: 'absolute',
        width: '94%',
        bottom: '10',
        height: '73vh',
        overflowX: 'hidden',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: '0 2.5vw',
    }

    return (
        <div className='nearbyParties-Screen'>
            <Header headerText="Nearby Parties"/>
            {myDefaultIndex !== undefined &&
            <div className='animation-NearbyParties'>
                <Tabs
                    style={{
                        top: '18%',
                        position: 'absolute',
                        width: '95%',

                    }}
                    selectedTabClassName='selectedTab'
                    className='disabledClassName'
                    defaultIndex={myDefaultIndex}
                >
                    <TabList style={{height: '100%'}}>
                        <Tab style={{width: '42%', textAlign: 'center'}}>List</Tab>
                        <Tab style={{width: '42%', textAlign: 'center'}}>Map</Tab>
                    </TabList>

                    <TabPanel>
                        <div style={myStyles}>
                            {partiesItems}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div style={{ height: '73vh', width: '100%', position: 'absolute', top: '9vh'}}>
                            {spinnerVisible &&
                            <div style={{position: 'fixed', width: '100%', height: '70%', display: 'flex', alignItems: 'center' ,justifyContent: 'center'}}>
                                <Loader
                                    type="Oval"
                                    color="#ADE8FF"
                                    height='100'
                                    width='100'
                                />
                            </div>
                            }
                            {userPosition &&
                            <MapContainer style={{height: '100%'}} id='myMap' center={[userPosition.latitude, userPosition.longitude]} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker position={userPosition} />
                                {markerItems}
                            </MapContainer>
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            }
        </div>
    );
}

export default NearbyPartiesScreen;
