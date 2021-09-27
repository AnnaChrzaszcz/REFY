import {FiArrowLeft} from "react-icons/fi";
import React from "react";
import {useHistory} from "react-router-dom";

export default function Header({headerText}) {

    const history = useHistory();

    const goBack = () => {
        if(headerText === 'Create Party' || headerText === 'Nearby Parties'){
            history.push('/dashboard');
        }
        else{
            history.goBack();
        }
    }

    return (
        <div className='header'>
            <FiArrowLeft onClick={goBack}  color='white' size='25%' />
            <h1 style={{color: 'white', margin: '0 3%', fontSize: '4vh'}}>{headerText}</h1>
        </div>
    );
}
