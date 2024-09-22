import React, { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header>
            <div ><a className="logo" href="/">BUSYCONNECTING</a></div>
            <nav>
            <ul>
                    <li><a href="#about">About Us</a></li>
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
            <button className="contact-header-btn"><a href="/contact">Contact Us</a></button>
        </header>
    );
}

export default Header;
