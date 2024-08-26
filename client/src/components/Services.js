import React from 'react';
import './Services.css';
import image from "../assets/images/whatwedo.svg";

function Services() {
    return (

        <section className="services">
            <h2>What We Do</h2>
            <div className="container">
                <img className="services-img" src={image} alt="graphic"/>
                <div className="services-buttons">
                    <button>Grant</button>
                    <button>Tender</button>
                    <button>Strategic Digital Marketing</button>
                </div>
            </div>

        </section>
    );
}

export default Services;
