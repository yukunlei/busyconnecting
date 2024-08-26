import React from 'react';
import './SmallerCard.css';

const SmallerCard = ({ title, date, description }) => {
    return (
        <div className="smallerCard">
            <img src="" alt={title} className="smallerCard-image" />
            <div className="smallerCard-content">
                <h3>{title}</h3>
                <p>{date}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default SmallerCard;