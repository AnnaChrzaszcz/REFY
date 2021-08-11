import {Link} from "react-router-dom";
import React from 'react';

export default function ChannelPreview({channel}) {
    return (
           <Link to={{pathname: '/dashboard/createParty/createChannel', state: channel}}>
                   <button style={{backgroundColor: channel?.color}}>{channel?.name + ' - ' + channel?.playlistURL}</button>
           </Link>
    );
}

//
