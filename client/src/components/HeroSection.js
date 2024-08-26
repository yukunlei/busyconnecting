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
                if (data && data.HeaderTitle) {
                    const { HeaderTitle, HeaderContent, SecondContent, Video } = data;

                    setHomePageData({
                        title: HeaderTitle,
                        headerText: HeaderContent,
                        content: SecondContent,
                        videoUrl: Video // YouTube video URL
                    });
                } else {
                    console.error("Invalid data structure or no data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching homepage data:", error);
            });

    }, []);

    // Extract the video ID from the YouTube URL
    const getYouTubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <section className="hero">
            <div className="hero-text">
                <h1>{homePageData.title}</h1>
                <p className="summary">{homePageData.headerText}</p>
                <button className="consultation-btn">Book a consultation</button>
            </div>
            <div className="video-placeholder">
                {homePageData.videoUrl && (
                    <iframe
                        width="560"
                        height="315"
                        src={getYouTubeEmbedUrl(homePageData.videoUrl)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </section>
    );
}

export default HeroSection;
