import React from 'react';
import './ContactButtons.css'; // Import the CSS file for styling

const ContactButtons = () => {
    return (
        <div className="contact-buttons">
            <a href="mailto:example@example.com" className="contact-btn email-btn">
                <img src="https://img.icons8.com/color/48/000000/email.png" alt="Email" />
                <span>Email</span>
            </a>

            <a href="https://www.facebook.com" className="contact-btn facebook-btn" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
                <span>Facebook</span>
            </a>

            <a href="https://www.linkedin.com" className="contact-btn linkedin-btn" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
                <span>LinkedIn</span>
            </a>

            <a href="https://www.youtube.com" className="contact-btn youtube-btn" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="YouTube" />
                <span>YouTube</span>
            </a>

            <a href="https://www.instagram.com" className="contact-btn instagram-btn" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
                <span>Instagram</span>
            </a>
        </div>
    );
};

export default ContactButtons;
