import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import HomePageEdit from "./HomePageEdit";
import CreateBlogPage from "./CreateBlogPage";
import EditBlogPage from "./EditBlogPage";
import EditInfoPage from "./EditInfoPage";
import NewsletterPage from "./NewsletterPage";
import UserDataPage from "./UserDataPage";
import './AdminPage.css';

function AdminPage({ onLogout }) {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const handleAddUser = () => {
        navigate('/signup');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`admin-page ${sidebarOpen ? "sidebar-open" : ""}`}>
            {/* Sidebar Toggle Button */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>

            {/* Sidebar Component */}
            <div className={`sidebar ${sidebarOpen ? "visible" : ""}`}>
                <h1>Admin Page</h1>
                <Link to="edit-home">Home Page</Link>
                <Link to="create-blog">Create Blog</Link>
                <Link to="edit-info">Info Page</Link>
                <Link to="edit-blog">Edit Blog</Link>
                <Link to="send-newsletter">Newsletter</Link>
                <Link to="edit-userdata">UserData</Link>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleAddUser}>Add Staff</button>
            </div>

            {/* Main Content Container */}
            <div className="container">
                <Routes>
                    <Route path="edit-home" element={<HomePageEdit />} />
                    <Route path="create-blog" element={<CreateBlogPage />} />
                    <Route path="edit-info" element={<EditInfoPage />} />
                    <Route path="edit-blog" element={<EditBlogPage />} />
                    <Route path="send-newsletter" element={<NewsletterPage />} />
                    <Route path="edit-userdata" element={<UserDataPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminPage;
