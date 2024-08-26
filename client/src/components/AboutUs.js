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
                if (data && data.HeaderTitle) {
                    const { SecondContent, Image } = data;

                    // Convert the image BLOB to a URL
                    let founderImageUrl = '';
                    if (Image) {
                        founderImageUrl = URL.createObjectURL(new Blob([Image]));
                    }

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

        // Cleanup function to revoke object URLs
        return () => {
            if (aboutUsData.founderImageUrl) {
                URL.revokeObjectURL(aboutUsData.founderImageUrl);
            }
        };
    }, [aboutUsData.founderImageUrl]);

    return (
        <section className="about-us">
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
