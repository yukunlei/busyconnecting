import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AdminPage from './AdminPage';   
import YellowBox from "./YellowBox";
import SubscribeNewsletter from "./SubscribeNewsletter";

function App() {
    return (
        <Router>
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
                    <Route path="/admin" element={<div>Contact Us Page<AdminPage /></div>} />  {/* Admin 페이지 경로 추가 */}
                </Routes>
                <YellowBox title={"About Us"} texts={"Some text"}>
                </YellowBox>
                <SubscribeNewsletter />
            </div>
        </Router>
    );
}

export default App;
