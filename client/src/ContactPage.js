import React, { useEffect, useState } from 'react';
import "./ContactPage.css";
import "./Global.css";
import Header from "./components/Header";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import ContactButtons from "./components/ContactButtons";

function ContactPage() {

    return (
        <div>
            <Header />
            <h1 className="title">Our Contact</h1>
            <ContactButtons />
            <Newsletter />
            <Footer />
        </div>
    );
}

export default ContactPage;
