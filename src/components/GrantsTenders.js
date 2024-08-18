import React from 'react';
import './GrantsTenders.css';
import Card from "./Card";

function GrantsTenders() {
    return (
        <section className="grants-tenders">
            <h2>Latest Available Grants and Tenders</h2>
            <div className="card-container">
                <Card
                    title={"For Home Page"}
                    date={"September 30, 2023 - October 30, 2023"}
                    description={"This business boost grants assist small businesses to enhance their efficiency and productivity."}
                />
                <Card
                    title={"For Home Page"}
                    date={"September 30, 2023 - October 30, 2023"}
                    description={"This business boost grants assist small businesses to enhance their efficiency and productivity."}
                />
                <Card
                    title={"For Home Page"}
                    date={"September 30, 2023 - October 30, 2023"}
                    description={"This business boost grants assist small businesses to enhance their efficiency and productivity."}
                />
            </div>
            <button className="all-grants-btn">All Available Grant</button>
        </section>
    );
}

export default GrantsTenders;
