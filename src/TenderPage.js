import React, { useEffect, useState } from 'react';
import "./EventPage.css";
import "./Global.css";
import Header from "./components/Header";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import YellowBox from "./components/YellowBox";
import image from "./Assets/Images/SitReadingDoodle.svg";
import "./TenderPage.css";
import Provider from "./Provider";
import providerIMG from "./Assets/Images/provider-logo.png";
import YellowBox2 from "./components/YellowBox2";
import yb2img from "./Assets/Images/yb2img.svg";

function TenderPage() {

    return (
        <div>
            <Header/>
            <h2 className="title">Tenders</h2>
            <YellowBox
                title={"A Tender is …."}
                texts={"a form of procurement by selection. It’s a process where a larger entity or organisation will invite suppliers to provide a formal written submission to bid on a project and it isn’t something that you should just trust to anyone to complete.\n" +
                    "\n" +
                    "When a project is put out to Tender there will be an expectation to meet all requirements and cost the project upon which a decision will be made.\n" +
                    "\n" +
                    "There are many forms of procurement which are Tenders and they can be called a number of things – Expression of Interest, Invitation to Offer, Request for Tender, Invitation to Respond, Request for Quote, Invitation to Tender, Request for Proposal and Approach to Market."}
                image={image}
            />
            <h2 className="title">Tenders Providers</h2>
            <div className="container">
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
                <Provider logos={providerIMG}/>
            </div>
            <YellowBox2
                title={"The Tender Writer\n"}
                texts={"When hiring a Tender Writer you want someone who is experienced and who has a depth of experience that has seen many varying situations.\n" +
                    "\n" +
                    "An expert Tender Writer will know how what is required and what you might be missing after reading all the documentation. They will know what additional services you will need to show that you are capable and give the assessors confidence that you can deliver the project within the deadline they set.\n" +
                    "\n" +
                    "An experienced Tender Writer knows how to communicate in a clear and concise manner whilst including all necessary information. They will be able to express your capability and methodology that is needed for the project.\n" +
                    "\n" +
                    "When you have an expert on your team you will know that there will be no surprises at the end on lodgement day. They will have operated many portals and will know how to include all your information within the given parameters."}
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

export default TenderPage;
