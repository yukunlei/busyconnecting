import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import HomePageEdit from "./HomePageEdit";
import CreateBlogPage from "./CreateBlogPage";
import EditBlogPage from "./EditBlogPage";
import EditInfoPage from "./EditInfoPage";
import NewsletterPage from "./NewsletterPage"
import UserDataPage from "./UserDataPage"


function AdminPage() {
    return (
        <div style={{ display: 'flex' }}>
            <div className="sidebar" style={styles.sidebar}>
                <h1 style={styles.sidebarTitle}>Admin Page</h1>
                <Link to="edit-home" style={styles.link}>Home Page</Link>
                <Link to="create-blog" style={styles.link}>Create Blog</Link>
                <Link to="edit-info" style={styles.link}>Info Page</Link>
                <Link to="edit-blog" style={styles.link}>Edit Blog</Link>
                <Link to="send-newsletter" style={styles.link}>Newsletter</Link>
                <Link to="edit-userdata" style={styles.link}>User Data</Link>
            </div>
            <div className="container" style={styles.container}>
                <Routes>
                    <Route path="edit-home" element={<HomePageEdit />} />
                    <Route path="create-blog" element={<CreateBlogPage />} />
                    <Route path="edit-info" element={<EditInfoPage />} />
                    <Route path="edit-blog" element={<EditBlogPage />} />
                    <Route path="send-newsletter" element={<NewsletterPage />} />
                    <Link to="edit-userdata" element={<UserDataPage />} />
                </Routes>
            </div>
        </div>
    );
}

const styles = {
    sidebar: {
        width: '250px',
        backgroundColor: '#FEFFCD',
        height: '100vh',
        paddingTop: '20px',
        position: 'fixed',
        top: '0',
        left: '0',
        overflowY: 'auto',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    sidebarTitle: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        padding: '10px 20px',
        textAlign: 'center',
        display: 'block',
    },
    container: {
        marginLeft: '250px',
        padding: '20px',
        width: 'calc(100% - 250px)',
        display: 'flex',
        flexDirection: 'column'
    }
};

export default AdminPage;
