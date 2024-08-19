import React, { useEffect, useState } from 'react';
import './AboutUs.css';

function AboutUs() {
    // State to hold the about us data
    const [aboutUsData, setAboutUsData] = useState({
        content: '',
        founderImageUrl: ''
    });

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetch('/api/homepage')
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    const { Content2, Image1 } = data.data[0];
                    // Convert the image blob to a URL
                    const founderImageUrl = URL.createObjectURL(new Blob([Image1]));

                    setAboutUsData({
                        content: Content2,
                        founderImageUrl: founderImageUrl
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching about us data:", error);
            });
    }, []);

    return (
        <section className="about-us">
            <h2>About Us</h2>
            <div className="content">
                <p>{aboutUsData.content}</p>
                <img className="founder-img" src={aboutUsData.founderImageUrl} alt="Founder"/>
            </div>
        </section>
    );
}

export default AboutUs;
