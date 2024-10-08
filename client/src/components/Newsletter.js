import React, { useState } from 'react';
import './Newsletter.css';
import ReadingDoodle from '../assets/images/bee2.png';

function Newsletter() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { firstName, lastName, email };

        try {
            const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Successfully subscribed!');
                setFirstName('');
                setLastName('');
                setEmail('');
            } else {
                setMessage(result.message || 'Subscription failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };


    return (
        <section className="newsletter">
            <form onSubmit={handleSubmit}>
                <h2>Join Our Newsletter!</h2>
                <label>First Name:</label>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
                {message && <p>{message}</p>}
            </form>

            <img className="newsletter-img" src={ReadingDoodle} alt="graphic" />
        </section>
    );
}

export default Newsletter;
