import React from 'react';
import './RefyButton.css';

export const RefyButton = ({text, onSubmit, disabled, id}) => {
    return (
       <div id={id} className='RefyButton' onClick={disabled ? null : onSubmit}>
           <text className='RefyButton-text'>{text}</text>
       </div>
    );
};


//<button className='RefyButton' onClick={onSubmit}>{text}</button>
