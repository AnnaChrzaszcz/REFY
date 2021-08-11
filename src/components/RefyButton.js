import React from 'react';
import './RefyButton.css';

export const RefyButton = ({text, onSubmit, disabled}) => {
    return (
       <span className='RefyButton' onClick={onSubmit}>
           <text className='RefyButton-text'>{text}</text>
       </span>
    );
};


//<button className='RefyButton' onClick={onSubmit}>{text}</button>
