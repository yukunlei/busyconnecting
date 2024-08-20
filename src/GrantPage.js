import React, { useEffect, useState } from 'react';
import "./EventPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import image from "./Assets/Images/SitReadingDoodle.svg";
import "./GrantPage.css";
import Provider from "./Provider";
import providerIMG from "./Assets/Images/provider-logo.png";
import YellowBox2 from "./components/YellowBox2";
import yb2img from "./Assets/Images/yb2img.svg";

function GrantPage() {

    return (
        <div>
            <Header/>
            <h2 className="title">Business Funding</h2>
            <YellowBox
                title={"Grants"}
                texts={"are a great tool to grow your business/organisation. Accessing marketing, business specialists, strategic assistance, even laptops. From specific small business grants announced in March to other funding available through the year depending on the size of your business. Contact us to find and write your grant application."}
                image={image}
            />
            <h2 className="title">Grant Providers</h2>
            <div className="container">
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
            </div>
            <YellowBox2
                title={"Your Expert Grant Writer"}
                texts={"A Grant Writing Expert on your team can be your secret ingredient!\n" +
                    "\n" +
                    "A well written application not only addresses all grant guidelines and criteria but considers all facets important to the grantor and their assessors.\n" +
                    "\n" +
                    "We pride ourselves in knowing what is looked for in considering grant applications. Our expertise comes from decades assessing grants as well as writing them. We know how to craft a well written application considering everything needed, which others miss.\n" +
                    "\n" +
                    "We apply our expertise in guiding you calmly and confidently through the process of applying. With our experience we can help you with all those additional services that you might need for your application. We have seen every scenario that you could come upon."}
                image={yb2img}
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
