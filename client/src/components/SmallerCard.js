import React from 'react';
import './SmallerCard.css';

const SmallerCard = ({ title, date, description, imageUrl }) => {
    return (
        <div className="smallerCard">
            {/* Check if imageUrl exists and display the image */}
            {imageUrl && (
                <img
                    src={`data:image/jpeg;base64,${imageUrl}`}
                    alt={`Image for ${title}`}
                    className="smallerCard-image"
                />
            )}
            <div className="smallerCard-content">
                <h3>{title}</h3>
                <p>{date}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default SmallerCard;
