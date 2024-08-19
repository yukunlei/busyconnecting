import React from 'react';
import './HeroSection.css';

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-text">
                <h1>Busy Connecting</h1>
                <p className="summary">
                    Welcome to Busy Connecting! We're your go-to for grants, tenders, and strategic digital marketing.
                    Let us handle the writing and finding, while you focus on success. Book a free call now to discuss
                    your needs!
                </p>
                <button className="consultation-btn">Book a consultation</button>
            </div>
            <div className="video-placeholder"></div>

        </section>
    );
}

export default HeroSection;
