import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Navigate 추가
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import AvailableBlogs from './components/AvailableBlogs';
import Newsletter from './components/Newsletter';
import Footer from './Footer';
import BlogPage from "./BlogPage";
import GrantPage from "./GrantPage";
import TenderPage from "./TenderPage";
import SDMPage from "./SDMPage";
import BlogDetail from './BlogDetail';
import BookAppointmentPage from "./BookAppointmentPage";
import ContactPage from "./ContactPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 토큰을 확인하여 로그인 상태를 설정
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // 로그아웃 시 토큰 삭제
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Routes>
                {/* 로그인 및 회원가입 페이지 */}
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                {/* 로그인이 되어있지 않으면 로그인 페이지로 리다이렉트 */}
                <Route 
                    path="/signup" 
                    element={isLoggedIn ? <SignupPage /> : <Navigate to="/login" replace />} 
                />

                {/* 어드민 페이지 */}
                <Route
                    path="/admin/*"
                    element={
                        isLoggedIn ? (
                            <AdminPage onLogout={handleLogout} />
                        ) : (
                            <LoginPage onLogin={handleLogin} />
                        )
                    }
                />

                {/* 블로그 페이지 */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/grant" element={<GrantPage />} />
                <Route path="/tender" element={<TenderPage />} />
                <Route path="/sdm" element={<SDMPage />} />
                <Route path="/appointment" element={<BookAppointmentPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* 기본 페이지 */}
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
