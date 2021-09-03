import React from 'react';
import './RefyButton.css';

export const RefyButton = ({text, onSubmit, disabled}) => {
    return (
       <div className='RefyButton' onClick={onSubmit}>
           <text className='RefyButton-text'>{text}</text>
       </div>
    );
};


//<button className='RefyButton' onClick={onSubmit}>{text}</button>
