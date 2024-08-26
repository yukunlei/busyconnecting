import React, { useEffect, useState } from 'react';
import "./GrantPage.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import YellowBox2 from "./components/YellowBox2";
import image from './assets/images/SitReadingDoodle.svg';
import providerIMG from './assets/images/provider-logo.png';
import yb2img from './assets/images/yb2img.svg';
import Provider from "./Provider";
function GrantPage() {
    const [businessFundingData, setBusinessFundingData] = useState({
        title: '',
        subtitle: '',
        content: '',
        subtitle2: '',
        content2: '',
        image1: ''
    });

    useEffect(() => {
        fetch('/api/businessfunding')
            .then(response => response.json())
            .then(data => {
                // Assuming the data returned has the same structure as the table
                const image1 = URL.createObjectURL(new Blob([data.image1]));
                setBusinessFundingData({
                    title: data.title,
                    subtitle: data.subtitle,
                    content: data.content,
                    subtitle2: data.subtitle2,
                    content2: data.content2,
                    image1: image1
                });
            })
            .catch(error => {
                console.error('Error fetching business funding data:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h2 className="title">{businessFundingData.title}</h2>
            <YellowBox
                title={businessFundingData.subtitle}
                texts={businessFundingData.content}
                image={image} // You might want to use businessFundingData.image1 here if needed
            />
            <h2 className="title">Grant Providers</h2>
            <div className="container">
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
            </div>
            <YellowBox2
                title={businessFundingData.subtitle2}
                texts={businessFundingData.content2}
                image={yb2img} // You might want to use a dynamic image here if needed
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
