import React, { useEffect, useState } from 'react';
import "./EventPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import img1 from "./Assets/Images/SitReadingDoodle.svg";
import "./SDMPage.css";
import img2 from "./Assets/Images/IceCreamDoodle.svg";
import img3 from "./Assets/Images/holdPlant.svg";
import ContentBox from "./components/ContentBox";

function SDMPage() {

    return (
        <div>
            <Header/>
            <h2 className="title">Tenders</h2>
            <YellowBox
                title={"Understanding Grants and Digital Marketing"}
                texts={"Now is the time to get strategic with your digital marketing. By being strategic and being seen in alignment with your applications can be the difference you need to make. A carefully thought out marketing plan will bring your ideal clients to your business and will give your business the credibility that grant assessors are looking for."}
                image={img1}
            />
            <h2 className="title">Tenders Providers</h2>
            <ContentBox
                title={"Mandatory requirement"}
                texts={"Meeting the criteria within a grant is an essential part of the application. Not meeting the criteria will leave your grant application out of the assessing process. It could also affect how you’re viewed in the future. Always ensure you meet the criteria."}
                image={img3}
            />
            <YellowBox
                title={"Building your credibility"}
                texts={"Building your credibility as a business is one of the best assets to obtaining grant funding but also lifting your search rating on Google so your ideal clients can find you."}
                image={img2}
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
