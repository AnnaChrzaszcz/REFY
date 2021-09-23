import React from "react";
import {Marker} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../assets/icons/marker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [53,53]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function LocationMarker({position}) {

    return position === null ? null : (
        <Marker position={[position.latitude, position.longitude]}>
        </Marker>
    );
}
