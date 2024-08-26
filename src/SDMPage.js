import React, { useEffect, useState } from 'react';
import "./SDMPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import ContentBox from "./components/ContentBox";
import img1 from "./Assets/Images/SitReadingDoodle.svg";
import img2 from "./Assets/Images/IceCreamDoodle.svg";
import img3 from "./Assets/Images/holdPlant.svg";

function SDMPage() {
    const [strategicData, setStrategicData] = useState({
        title: '',
        subtitle: '',
        content: '',
        subtitle2: '',
        content2: '',
        subtitle3: '',
        content3: '',
        image1: '',
        image2: '',
        image3: ''
    });

    useEffect(() => {
        fetch('/api/strategic')
            .then(response => response.json())
            .then(data => {
                // Handle BLOB data if needed
                const image1 = data.image1 ? URL.createObjectURL(new Blob([data.image1])) : img1;
                const image2 = data.image2 ? URL.createObjectURL(new Blob([data.image2])) : img2;
                const image3 = data.image3 ? URL.createObjectURL(new Blob([data.image3])) : img3;

                setStrategicData({
                    title: data.title,
                    subtitle: data.subtitle,
                    content: data.content,
                    subtitle2: data.subtitle2,
                    content2: data.content2,
                    subtitle3: data.subtitle3,
                    content3: data.content3,
                    image1: image1,
                    image2: image2,
                    image3: image3
                });
            })
            .catch(error => {
                console.error('Error fetching strategic data:', error);
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
                image={strategicData.image3}
            />
            <YellowBox
                title={strategicData.subtitle3}
                texts={strategicData.content3}
                image={strategicData.image2}
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
