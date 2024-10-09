import React from 'react';
import './RedButton.css';
import { useNavigate } from 'react-router-dom';

const RedButton = ({ text }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the appointment page
        navigate('/appointment');

        // Add a delay to ensure the page loads before scrolling
        setTimeout(() => {
            const calendarSection = document.getElementById("calendar-form-section");
            if (calendarSection) {
                calendarSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 300); // Adjust delay as needed
    };

    return (
        <button className="red-button" onClick={handleClick}>
            {text}
        </button>
    );
};

export default RedButton;
