import React, { useEffect, useState } from 'react';
import "./TenderPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import YellowBox2 from "./components/YellowBox2";
import defaultImage from './assets/images/SitReadingDoodle.svg'; // Fallback image
import providerIMG from './assets/images/provider-logo.png';
import yb2img from './assets/images/yb2img.svg';
import Provider from "./Provider";

function TenderPage() {
    const [tenderData, setTenderData] = useState({
        title: '',
        subtitle: '',
        content: '',
        subtitle2: '',
        content2: '',
        image1: defaultImage,
        image2: defaultImage
    });

    useEffect(() => {
        fetch('/api/infoPage/TendersPage')
            .then(response => response.json())
            .then(data => {
                // Convert Base64 image data to data URLs
                const convertToDataURL = (base64) => base64 ? `data:image/jpeg;base64,${base64}` : defaultImage;

                setTenderData({
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
                console.error('Error fetching tenders page data:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h2 className="title">{tenderData.title}</h2>
            <YellowBox
                title={tenderData.subtitle}
                texts={tenderData.content}
                image={tenderData.image1} // Use dynamic image1 here
            />
            <h2 className="title">Tenders Providers</h2>
            <div className="container-provider">
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
            </div>
            <YellowBox2
                title={tenderData.subtitle2}
                texts={tenderData.content2}
                image={tenderData.image2} // Use dynamic image2 here
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

export default TenderPage;
