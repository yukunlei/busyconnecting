import React, { useEffect, useState } from 'react';
import "./BookAppointmentPage.css";
import "./Global.css";
import Header from "./components/Header";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";
import CalendarForm from "./components/CalendarForm";

function BookAppointmentPage() {

    return (
        <div>
            <Header />
            <h1 className="title">Book a free 30-minute Zoom consultation!</h1>
            <CalendarForm />
            <Newsletter />
            <Footer />
        </div>
    );
}

export default BookAppointmentPage;
