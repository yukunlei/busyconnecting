import React from 'react';
import './YellowBox2.css';

const YellowBox2 = ({ title, texts, image }) => {
    return (
        <div className="yellow-box">
            <div className="content">
                <div className="yellow-box-content">
                    <h2>{title}</h2>
                    <p>
                        {texts}
                    </p>
                </div>
            </div>
            <img src={image}/>
        </div>
    );
};

export default YellowBox2;