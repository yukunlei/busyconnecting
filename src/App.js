import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import YellowBox from "./YellowBox";
import SubscribeNewsletter from "./SubscribeNewsletter";
import ServiceButton from './ServiceButton';
import Card from './Card';
import RedButton from "./RedButton";
import './Global.css';
import Provider from "./Provider";
import SearchBar from "./SearchBar";
import SmallerCard from "./SmallerCard";


function App() {


    const providerLogo = [
        "./Assets/Images/provider-logo-4 1.png"
    ];
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path="/about-us" component={() => <div>About Us Page</div>}/>
                    <Route path="/services/grants" component={() => <div>Grants Page</div>}/>
                    <Route path="/services/tenders" component={() => <div>Tenders Page</div>}/>
                    <Route path="/services/strategic-digital-marketing"
                           component={() => <div>Strategic Digital Marketing Page</div>}/>
                    <Route path="/services/available-grants" component={() => <div>Available Grants Page</div>}/>
                    <Route path="/blogs" component={() => <div>Blogs Page</div>}/>
                    <Route path="/contact-us" component={() => <div>Contact Us Page</div>}/>
                </Routes>

                <h2>What We Do</h2>
                <ServiceButton text={"Grant"}/>
                <ServiceButton text={"Tender"}/>
                <ServiceButton text={"Strategic Digital Marketing"}/>

                <SearchBar placeholder={"Search for event"}/>

                <YellowBox title={"About Us"}
                           texts={"Busy Connecting is a renowned organization supporting businesses of all sizes.\n" +
                               "                We’ve aided numerous industries in securing essential funding for growth. Our\n" +
                               "                experienced team, led by founder Robyn Baker with over 40 years of grant and\n" +
                               "                tender expertise, is widely recognized."}>
                </YellowBox>

                <Provider logos={providerLogo}></Provider>
                <div className="grant-list">
                    <Card
                        title={"For Home Page"}
                        date={"September 30, 2023 - October 30, 2023"}
                        description={"This business boost grants assist small businesses to enhance their efficiency and productivity."}
                    />

                    <SmallerCard
                          title={"For Event & Blog Page"}
                          date={"September 30, 2023 - October 30, 2023"}
                          description={"This business boost grants assist small businesses to enhance their efficiency and productivity."}
                    />

                </div>

                <RedButton text={"All Available Grant"}/>

                <SubscribeNewsletter/>

            </div>

        </Router>

    );
}

export default App;
