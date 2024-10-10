import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false); // State to manage mobile view menu

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen); // Toggle the navigation menu
    };

    const handleAboutClick = () => {
        if (window.location.pathname === "/") {
            const aboutSection = document.getElementById("about-section");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const aboutSection = document.getElementById("about-section");
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    };

    return (
        <header>
            <div><a className="logo" href="/">BUSYCONNECTING</a></div>
            {/* Add a button to toggle the menu */}
            <button className="nav-toggle" onClick={toggleNav}>
                ☰
            </button>
            <nav className={`nav-menu ${isNavOpen ? "open" : ""}`}>
                <ul>
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
