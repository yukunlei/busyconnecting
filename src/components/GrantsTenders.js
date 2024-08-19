import React, { useEffect, useState } from 'react';
import './GrantsTenders.css';
import Card from "./Card";

function GrantsTenders() {
    // State to hold the latest event data
    const [events, setEvents] = useState([]);

    // Fetch the latest 3 events when the component mounts
    useEffect(() => {
        fetch('/api/latest-events')
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    // Map over the data to convert BLOB images to URLs
                    const eventsWithImageUrls = data.data.map(event => {
                        const imageUrl = URL.createObjectURL(new Blob([event.Image]));
                        return { ...event, imageUrl };
                    });
                    setEvents(eventsWithImageUrls);
                }
            })
            .catch((error) => {
                console.error("Error fetching latest events:", error);
            });
    }, []);

    return (
        <section className="grants-tenders">
            <h1>Latest Available Grants and Tenders</h1>
            <div className="card-container">
                {events.map((event) => (
                    <Card
                        key={event.EventId}
                        title={event.Title}
                        date={new Date(event.DateTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                        description={event.Content1}
                        image={event.imageUrl}
                    />
                ))}
            </div>
            <button className="all-grants-btn">
                <a className="link" href="/event">All Available Grants</a>
            </button>
        </section>
    );
}

export default GrantsTenders;
