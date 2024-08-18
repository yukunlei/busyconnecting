import React from 'react';
import './Header.css'; // Create a CSS file for styling

function Header() {
    return (
        <header>
            <div className="logo">BUSYCONNECTING</div>
            <nav>
                <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#blogs">Blogs</a></li>
                </ul>
            </nav>
            <button className="contact-btn">Contact Us</button>
        </header>
    );
}

export default Header;
