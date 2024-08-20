import React from 'react';
import './ContentBox.css';

const ContentBox = ({ title, texts, image }) => {
    return (
        <div className="content-box">
            <div className="content">
                <div className="content-box-content">
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

export default ContentBox;