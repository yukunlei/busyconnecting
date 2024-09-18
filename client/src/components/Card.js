import React from 'react';
import './Card.css';

function Card({ title, date, description, image, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {image && <img className="card-image" src={image} alt={title} />}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-date">{date}</p>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
}

export default Card;
