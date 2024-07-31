import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';


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
            </div>
        </Router>
    );
}

export default App;
