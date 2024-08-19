import React from 'react';
import './Newsletter.css';
import ReadingDoodle from '../Assets/Images/ReadingDoodle.jpg';

function Newsletter() {
    return (
        <section className="newsletter">
            <form>
                <h2>Join Our Newsletter!</h2>
                <label>First Name:</label>
                <input type="text" placeholder="First Name"/>
                <label>Last Name:</label>
                <input type="text" placeholder="Last Name"/>
                <label>Email:</label>
                <input type="email" placeholder="Email"/>
                <button type="submit">Submit</button>
            </form>

            <img className="newsletter-img" src={ReadingDoodle} alt="graphic"/>
        </section>
    );
}

export default Newsletter;
