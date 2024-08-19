import React, { useEffect, useState } from 'react';
import './HeroSection.css';

function HeroSection() {
    // State to hold the homepage data
    const [homePageData, setHomePageData] = useState({
        title: '',
        headerText: '',
        content: '',
        videoUrl: ''
    });

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetch('/api/homepage')
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    const { Title, HeaderText, Content2, Video } = data.data[0];
                    // Convert the video blob to a URL
                    const videoUrl = URL.createObjectURL(new Blob([Video], { type: 'video/mp4' }));

                    setHomePageData({
                        title: Title,
                        headerText: HeaderText,
                        content: Content2,
                        videoUrl: videoUrl
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching homepage data:", error);
            });
    }, []);

    return (
        <section className="hero">
            <div className="hero-text">
                <h1>{homePageData.title}</h1>
                <p className="summary">
                    {homePageData.headerText}
                </p>
                <button className="consultation-btn">Book a consultation</button>
            </div>
            <div className="video-placeholder">
                {/* Render the video dynamically */}
                {homePageData.videoUrl && <video src={homePageData.videoUrl} controls />}
            </div>
        </section>
    );
}

export default HeroSection;
