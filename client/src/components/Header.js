import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleAboutClick = () => {
        // If we are on the homepage, scroll to the "About Us" section
        if (window.location.pathname === "/") {
            const aboutSection = document.getElementById("about-section");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Navigate to the homepage and then scroll to the "About Us" section
            navigate("/");
            setTimeout(() => {
                const aboutSection = document.getElementById("about-section");
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Delay added to ensure the page has time to render
        }
    };

    return (
        <header>
            <div><a className="logo" href="/">BUSYCONNECTING</a></div>
            <nav>
                <ul>
                    {/* Use handleAboutClick for About Us link */}
                    <li><a href="#about" onClick={handleAboutClick}>About Us</a></li>
                    <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        <a href="/services">Services</a>
                        {dropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><a href="/grant">Grant</a></li>
                                <li><a href="/tender">Tender</a></li>
                                <li><a href="/sdm">Strategic Digital Marketing</a></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/blog" className="nav-link">Blogs</Link></li>
                </ul>
            </nav>
            <Link to="/contact" className="contact-btn">Contact Us</Link>
        </header>
    );
}

export default Header;
