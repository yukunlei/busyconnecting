import React from 'react';
import './YellowBox.css';

const YellowBox = ({ title, texts }) => {
    return (
        <div className="yellow-box">
            <h2>{title}</h2>
            <div className="yellow-box-content">
                {texts}
            </div>
        </div>
    );
};

export default YellowBox;