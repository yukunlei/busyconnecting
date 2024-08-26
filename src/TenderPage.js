import React, { useEffect, useState } from 'react';
import "./TenderPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import YellowBox2 from "./components/YellowBox2";
import image from "./Assets/Images/SitReadingDoodle.svg";
import providerIMG from "./Assets/Images/provider-logo.png";
import yb2img from "./Assets/Images/yb2img.svg";
import Provider from "./Provider";

function TenderPage() {
    const [tenderData, setTenderData] = useState({
        title: '',
        subtitle: '',
        content: '',
        subtitle2: '',
        content2: '',
        image1: ''
    });

    useEffect(() => {
        fetch('/api/tenders')
            .then(response => response.json())
            .then(data => {
                // Handle BLOB data if needed
                const image1 = data.image1 ? URL.createObjectURL(new Blob([data.image1])) : null;
                setTenderData({
                    title: data.title,
                    subtitle: data.subtitle,
                    content: data.content,
                    subtitle2: data.subtitle2,
                    content2: data.content2,
                    image1: image1
                });
            })
            .catch(error => {
                console.error('Error fetching tenders data:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h2 className="title">{tenderData.title}</h2>
            <YellowBox
                title={tenderData.subtitle}
                texts={tenderData.content}
                image={image} // You might want to use tenderData.image1 here if needed
            />
            <h2 className="title">Tenders Providers</h2>
            <div className="container">
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
            </div>
            <YellowBox2
                title={tenderData.subtitle2}
                texts={tenderData.content2}
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

export default TenderPage;
