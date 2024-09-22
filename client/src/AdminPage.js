import React from 'react'; 
import {Link, Route, Routes, useNavigate } from 'react-router-dom';  // useNavigate 추가
import HomePageEdit from "./HomePageEdit";
import CreateBlogPage from "./CreateBlogPage";
import EditBlogPage from "./EditBlogPage";
import EditInfoPage from "./EditInfoPage";
import NewsletterPage from "./NewsletterPage";
import UserDataPage from "./UserDataPage";

function AdminPage({ onLogout }) {
    const navigate = useNavigate();  // 리다이렉트를 위한 useNavigate 사용

    const handleLogout = () => {
        onLogout();  // 로그아웃 함수 호출
        navigate('/login');  // 로그인 페이지로 리다이렉트
    };

    const handleLAddUser = () => { 
        navigate('/signup');  // 로그인 페이지로 리다이렉트
    };

    return (
        <div>
           
            <div style={{ display: 'flex' }}>
                <div className="sidebar" style={styles.sidebar}>
                    <h1 style={styles.sidebarTitle}>Admin Page</h1>
                    <Link to="edit-home" style={styles.link}>Home Page</Link>
                    <Link to="create-blog" style={styles.link}>Create Blog</Link>
                    <Link to="edit-info" style={styles.link}>Info Page</Link>
                    <Link to="edit-blog" style={styles.link}>Edit Blog</Link>
                    <Link to="send-newsletter" style={styles.link}>Newsletter</Link>
                    <Link to="edit-userdata" style={styles.link}>UserData</Link>
                    <button onClick={handleLogout}>Logout</button>  {/* handleLogout 함수로 변경 */}
                    <button onClick={handleLAddUser}>Add Staff</button>   
                </div>
                <div className="container" style={styles.container}>
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
