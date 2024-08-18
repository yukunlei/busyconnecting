import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AdminPage from './AdminPage';   
import YellowBox from "./YellowBox";
import SubscribeNewsletter from "./SubscribeNewsletter";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route 
                    path="*" 
                    element={
                        <div className="App">
                            <Navbar />
                            <Routes>
                                <Route path="/about-us" element={<div>About Us Page</div>} />
                                <Route path="/services/grants" element={<div>Grants Page</div>} />
                                <Route path="/services/tenders" element={<div>Tenders Page</div>} />
                                <Route path="/services/strategic-digital-marketing" element={<div>Strategic Digital Marketing Page</div>} />
                                <Route path="/services/available-grants" element={<div>Available Grants Page</div>} />
                                <Route path="/blogs" element={<div>Blogs Page</div>} />
                                <Route path="/contact-us" element={<div>Contact Us Page</div>} />
                            </Routes>
                            <YellowBox title={"About Us"} texts={"Some text"} />
                            <SubscribeNewsletter />
                        </div>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
