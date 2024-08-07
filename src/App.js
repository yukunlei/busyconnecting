import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import YellowBox from "./YellowBox";
import SubscribeNewsletter from "./SubscribeNewsletter";


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/about-us" component={() => <div>About Us Page</div>} />
                    <Route path="/services/grants" component={() => <div>Grants Page</div>} />
                    <Route path="/services/tenders" component={() => <div>Tenders Page</div>} />
                    <Route path="/services/strategic-digital-marketing" component={() => <div>Strategic Digital Marketing Page</div>} />
                    <Route path="/services/available-grants" component={() => <div>Available Grants Page</div>} />
                    <Route path="/blogs" component={() => <div>Blogs Page</div>} />
                    <Route path="/contact-us" component={() => <div>Contact Us Page</div>} />
                </Routes>

                <YellowBox title={"About Us"} texts={"Busy Connecting is a renowned organization supporting businesses of all sizes.\n" +
                    "                We’ve aided numerous industries in securing essential funding for growth. Our\n" +
                    "                experienced team, led by founder Robyn Baker with over 40 years of grant and\n" +
                    "                tender expertise, is widely recognized."}>
                </YellowBox>
                <SubscribeNewsletter />
            </div>

        </Router>

    );
}

export default App;
