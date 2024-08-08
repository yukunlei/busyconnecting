import React from 'react';
import './ServiceButton.css';

const ServiceButton = ({ text, onClick }) => {
    return (
        <button className="service-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default ServiceButton;