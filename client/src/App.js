import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import AvailableBlogs from './components/AvailableBlogs';
import Newsletter from './components/Newsletter';
import Footer from './Footer';
import BlogPage from "./BlogPage";
import "./Global.css";
import GrantPage from "./GrantPage";
import TenderPage from "./TenderPage";
import SDMPage from "./SDMPage";
import BlogDetail from './BlogDetail';
import BookAppointmentPage from "./BookAppointmentPage";
import ContactPage from "./ContactPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/grant" element={<GrantPage />} />
                <Route path="/tender" element={<TenderPage />} />
                <Route path="/sdm" element={<SDMPage />} />
                <Route path="/appointment" element={<BookAppointmentPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="*"
                    element={
                        <div className="App">
                            <Routes>
                                <Route path="/about-us" element={<div>About Us Page</div>} />
                                <Route path="/services/grants" element={<div>Grants Page</div>} />
                                <Route path="/services/tenders" element={<div>Tenders Page</div>} />
                                <Route path="/services/strategic-digital-marketing" element={<div>Strategic Digital Marketing Page</div>} />
                                <Route path="/services/eventpage" element={<div>Available Grants Page</div>} />
                                <Route path="/blogpage" element={<div>Blogs Page</div>} />
                                <Route path="/contact" element={<div>Contact Us Page</div>} />
                            </Routes>

                            <Header />
                            <HeroSection />
                            <Services />
                            <AboutUs />
                            <AvailableBlogs />
                            <Newsletter />
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </Router>

    );
}

export default App;