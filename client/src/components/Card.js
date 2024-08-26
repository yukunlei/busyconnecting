import React from 'react';
import './Card.css';

const Card = ({ title, date, description, image }) => {
    return (
        <div className="card">
            <img src={image} alt={"card image"} className="card-image" />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{date}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Card;