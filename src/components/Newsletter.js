import React from 'react';
import './Newsletter.css';

function Newsletter() {
    return (
        <section className="newsletter">
            <h2>Join Our Newsletter!</h2>
            <form>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default Newsletter;
