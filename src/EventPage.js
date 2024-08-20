import React, { useEffect, useState } from 'react';
import "./EventPage.css";
import "./Global.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SmallerCard from "./components/SmallerCard";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";

function EventPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/eventpage')
            .then(response => response.json())
            .then(data => {
                setEvents(data.data); // Assuming your API returns data as { "data": rows }
            })
            .catch(error => {
                console.error('Error fetching event posts:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h1 className="title"> Events</h1>
            <SearchBar placeholder={"Search Event"} />
            <div className="event-container">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.EventId} className="event-post">
                            <SmallerCard
                                title={event.Title}
                                date={new Date(event.DateTime).toLocaleString()}
                                description={event.Content1}
                            />
                        </div>
                    ))
                ) : (
                    <p>No event posts available.</p>
                )}
            </div>
            <div className="button-container">
                <h2 className="txt">Want to know more?</h2>
                <RedButton text={"Book a consultation"}/>
            </div>
            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default EventPage;
