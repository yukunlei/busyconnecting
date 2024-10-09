import React, { useEffect, useState } from 'react';
import './AboutUs.css';

function AboutUs() {
    const [aboutUsData, setAboutUsData] = useState({
        content: '',
        founderImageUrl: ''
    });

    useEffect(() => {
        fetch('/api/homepage')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.SecondContent) {
                    const { SecondContent, Image } = data;
                    const founderImageUrl = Image ? `data:image/jpeg;base64,${Image}` : '';
                    setAboutUsData({
                        content: SecondContent,
                        founderImageUrl: founderImageUrl
                    });
                } else {
                    console.error("Invalid data structure or no data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching about us data:", error);
            });
    }, []);

    return (
        <section className="about-us" id="about-section">
            <h2>About Us</h2>
            <div className="content">
                <p>{aboutUsData.content}</p>
                {aboutUsData.founderImageUrl && (
                    <img className="founder-img" src={aboutUsData.founderImageUrl} alt="Founder" />
                )}
            </div>
        </section>
    );
}

export default AboutUs;
