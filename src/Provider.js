import React from 'react';
import './Provider.css';

const Provider = ({ logos }) => {
    return (
        <section className="provider-section">
            {logos.map((logo) => (
                <div className="provider-logo">
                    <img src={logo} alt={`For Info Page Providers Section`} />
                </div>
            ))}
        </section>
    );
};

export default Provider;