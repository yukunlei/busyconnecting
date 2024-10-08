import React from 'react';
import './Services.css';
import image from "../assets/images/bee.png";

function Services() {
    return (

        <section className="services">
            <h2>What We Do</h2>
            <div className="container-service">
                <img className="services-img" src={image} alt="graphic"/>
                <div className="services-buttons">
                    <button>
                        <a className="service-link" href="/grant">Grant</a>
                    </button>
                    <button>
                        <a className="service-link" href="/tender">Tender</a>
                    </button>
                    <button>
                        <a className="service-link" href="/sdm">Strategic Digital Marketing</a>
                    </button>
                </div>
            </div>

        </section>
    );
}

export default Services;
