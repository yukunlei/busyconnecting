import React from 'react';
import './Newsletter.css';

function Newsletter() {
    return (
        <section className="newsletter">
            <form>
                <h2>Join Our Newsletter!</h2>
                <input type="text" placeholder="First Name"/>
                <input type="text" placeholder="Last Name"/>
                <input type="email" placeholder="Email"/>
                <button type="submit">Submit</button>
            </form>

            <img className="newsletter-img" src="path-to-image.jpg" alt="graphic"/>
        </section>
    );
}

export default Newsletter;
