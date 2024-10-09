import React, { useEffect, useState } from 'react';
import "./GrantPage.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import YellowBox2 from "./components/YellowBox2";
import defaultImage from './assets/images/SitReadingDoodle.svg'; // Fallback image
import providerIMG from './assets/images/provider-logo.png';
import yb2img from './assets/images/yb2img.svg'; // Fallback image
import Provider from "./Provider";

function GrantPage() {
    const [grantData, setGrantData] = useState({
        title: '',
        subtitle: '',
        content: '',
        subtitle2: '',
        content2: '',
        image1: defaultImage, // Default fallback image
        image2: defaultImage  // Default fallback image
    });

    useEffect(() => {
        fetch('/api/infoPage/BusinessFundingPage')
            .then(response => response.json())
            .then(data => {
                // Convert Base64 image data to data URLs
                const convertToDataURL = (base64) => base64 ? `data:image/jpeg;base64,${base64}` : defaultImage;

                setGrantData({
                    title: data.title,
                    subtitle: data.subtitle,
                    content: data.content,
                    subtitle2: data.subtitle2,
                    content2: data.content2,
                    image1: convertToDataURL(data.image1),
                    image2: convertToDataURL(data.image2)
                });
            })
            .catch(error => {
                console.error('Error fetching business funding data:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h2 className="title">{grantData.title}</h2>
            <YellowBox
                title={grantData.subtitle}
                texts={grantData.content}
                image={grantData.image1} // Use fetched image1
            />
            <h2 className="title">Grant Providers</h2>
            <div className="container-provider">
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
            </div>
            <YellowBox2
                title={grantData.subtitle2}
                texts={grantData.content2}
                image={grantData.image2} // Use fetched image2
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

export default GrantPage;
