import React from 'react';
import FacebookIcon from './Assets/Images/Facebook.png';
import InstagramIcon from './Assets/Images/Instagram.png';
import LinkedInIcon from './Assets/Images/LinkedIn.png';
import YouTubeIcon from './Assets/Images/YouTube.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={FacebookIcon} alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={LinkedInIcon} alt="LinkedIn" className="social-icon" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src={YouTubeIcon} alt="YouTube" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={InstagramIcon} alt="Instagram" className="social-icon" />
                    </a>
                </div>
                <div className="footer-text">
                    <p>© 2024 - Busy Connecting</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
