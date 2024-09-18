import React, { useEffect, useState } from 'react';
import "./SDMPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import ContentBox from "./components/ContentBox";
import defaultImage from "./assets/images/SitReadingDoodle.svg"; // Fallback image

function SDMPage() {
    const [strategicData, setStrategicData] = useState({
        title: '',
        subtitle: '',
        content: '',
        subtitle2: '',
        content2: '',
        subtitle3: '',
        content3: '',
        image1: defaultImage,
        image2: defaultImage,
        image3: defaultImage
    });

    useEffect(() => {
        fetch('/api/infoPage/StrategicPage')
            .then(response => response.json())
            .then(data => {
                // Convert Base64 image data to data URLs
                const convertToDataURL = (base64) => base64 ? `data:image/jpeg;base64,${base64}` : defaultImage;

                setStrategicData({
                    title: data.title,
                    subtitle: data.subtitle,
                    content: data.content,
                    subtitle2: data.subtitle2,
                    content2: data.content2,
                    subtitle3: data.subtitle3,
                    content3: data.content3,
                    image1: convertToDataURL(data.image1),
                    image2: convertToDataURL(data.image2),
                    image3: convertToDataURL(data.image3)
                });
            })
            .catch(error => {
                console.error('Error fetching strategic page data:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h2 className="title">{strategicData.title}</h2>
            <YellowBox
                title={strategicData.subtitle}
                texts={strategicData.content}
                image={strategicData.image1}
            />
            <ContentBox
                title={strategicData.subtitle2}
                texts={strategicData.content2}
                image={strategicData.image2}
            />
            <YellowBox
                title={strategicData.subtitle3}
                texts={strategicData.content3}
                image={strategicData.image3}
            />
            <div className="button-container">
                <h2 className="txt">Want to know more?</h2>
                <RedButton text={"Book a consultation"}/>
            </div>
            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default SDMPage;
