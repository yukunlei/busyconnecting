import React from 'react';
import './Provider.css';

const Provider = ({ logos }) => {
    return (
        <section className="provider-section">
            <div className="provider-logo">
                <img src={logos} alt={`For Info Page Providers Section`} />
            </div>
        </section>
    );
};

export default Provider;