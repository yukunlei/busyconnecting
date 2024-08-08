import React from 'react';
import './RedButton.css';

const RedButton = ({ text, onClick }) => {
    return (
        <button className="red-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default RedButton;