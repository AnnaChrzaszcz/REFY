import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import '../styles/PartyDetails.css';
import Channel from "../components/Channel";
import {FiArrowLeft, FiMapPin, FiX} from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import {CircleMarker, MapContainer, TileLayer} from "react-leaflet";

const PartyDetailsScreen = () => {

    let location = useLocation();
    const [party, setParty] = useState({});
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [positionColor, setPositionColor] = useState('white');


    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        setPositionColor(showModal ? '#ADE8FF' : 'white');
    }, [showModal])

    const modalStyles = {
        backgroundColor: 'black',
        position: 'fixed',
        top: '36%',
        width: '70%',
        height: '55%',
        marginLeft: '15%',
        marginRight: '15%',
        borderColor: 'black',
        borderWidth: '0.5',
        borderStyle: 'solid',
        borderRadius: '15px'
    }

    useEffect(() => {
        if(location.state.party){
            setParty(location.state.party);
        }
    }, [])

    const goBack = () => {
        if(location.state.newParty){
            history.push('/dashboard');
        }
        else{
            if(location.state.fromMap){
                history.push('/dashboard/nearbyParties', {defaultIndex: 1});
            }
            else{
                //history.goBack();
                history.push('/dashboard/nearbyParties', {defaultIndex: 0});
            }

        }

    }

    const channelItemComponent = party?.channels?.map((channel) =>
        <div key={channel.number}>
            <Channel channel={channel} partyId={party._id}/>
        </div>
    );

    return (
        <div className='partyDetailsScreen'>
            <div className='header-partyDetails'>
                <FiArrowLeft onClick={goBack}  color='white' size='10%' style={{margin: '8% 0'}}/>
                <br/>
                <text style={{color: 'white', fontSize: '5vh'}}>{party.name}</text>
                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <text style={{color: 'white', fontSize: '4vh'}}>Channels</text>
                <FiMapPin onClick={handleShow} color={positionColor} size='4vh' style={{marginRight: '8%'}} />
                </div>
            </div>
            {showModal &&
            <FiX onClick={handleShow} color={"black"} size='4vh' style={{position: 'absolute', top: '37%', right: '15%', zIndex: '9'}} />
            }
            <Modal centered={true} style={modalStyles} show={showModal} onHide={handleClose}>
                <Modal.Body>
                    {party.coord &&
                    <MapContainer style={{height: '55vh', width: '70vw', borderRadius: '15px'}} id='myMap' center={[party.coord.latitude, party.coord.longitude]} zoom={15} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <CircleMarker color='purple' fillOpacity={0.5} center={[party.coord.latitude, party.coord.longitude]}/>
                    </MapContainer>
                    }
                </Modal.Body>
            </Modal>
            {party.channels &&
            <div style={{opacity: showModal ? '0.4' : '1'}} className="channel-container">
                {channelItemComponent}
            </div>
            }
        </div>
    );
}

export default PartyDetailsScreen;
