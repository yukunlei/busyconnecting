import React from 'react';
import './YellowBox.css';

const YellowBox = ({ title, texts, image }) => {
    return (
        <div className="yellow-box">
            <img src={image} />
            <div className="content">
                <div className="yellow-box-content">
                    <h2>{title}</h2>
                    <p>
                        {texts}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default YellowBox;