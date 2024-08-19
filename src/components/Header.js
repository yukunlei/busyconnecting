import React from 'react';
import './Header.css';
import {Link} from "react-router-dom"; // Create a CSS file for styling

function Header() {
    return (
        <header>
            <div className="logo">BUSYCONNECTING</div>
            <nav>
                <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="/event">Services</a></li>
                    <li><Link to="/blog" className="nav-link">Blogs</Link></li>
                </ul>
            </nav>
            <button className="contact-btn">Contact Us</button>
        </header>
    );
}

export default Header;
