import React, { useState, useEffect } from 'react';

function AdminPage() {
    const [activeSection, setActiveSection] = useState('editHomePage');
    const [title, setTitle] = useState('');
    const [blogDateTime, setBlogDateTime] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [headerTitle, setHeaderTitle] = useState('');
    const [headerContent, setHeaderContent] = useState('');
    const [secondTitle, setSecondTitle] = useState('');
    const [secondContent, setSecondContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [ setImage] = useState(null);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };
    useEffect(() => {
        if (activeSection === 'editHomePage') {
            fetch('/api/homepage')
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setHeaderTitle(data.HeaderTitle);
                        setHeaderContent(data.HeaderContent);
                        setSecondTitle(data.SecondTitle);
                        setSecondContent(data.SecondContent);
                        setVideoUrl(data.Video);
                        // 이미지 필드는 생략, 필요시 추가 가능
                    }
                })
                .catch(error => {
                    console.error('Error fetching home page data:', error);
                });
        }
    }, [activeSection]);
    const handleBlogSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            Title: title,
            BlogDateTime: blogDateTime,
            Content1: content1,
            Content2: content2,
        };

        fetch('/api/blogpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Blog post created with ID:', data.BlogId);
            setTitle('');
            setBlogDateTime('');
            setContent1('');
            setContent2('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleHomePageSubmit = (e) => {
        e.preventDefault();
    
        const homePageData = {
            HeaderTitle: headerTitle,
            HeaderContent: headerContent,
            Video: videoUrl,
            SecondTitle: secondTitle,
            SecondContent: secondContent,
            // 이미지 필드는 예시로 추가 가능
        };
    
        fetch('http://localhost:3001/api/homepage', {  // 절대 경로로 URL 수정
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(homePageData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Home page updated:', data.message);
            alert('홈페이지 정보가 성공적으로 업데이트되었습니다.');
        })
        .catch(error => {
            console.error('Error updating home page:', error);
            alert('홈페이지 정보 업데이트 중 오류가 발생했습니다.');
        });
    };
    return (
        <div style={{ display: 'flex' }}>
            <div className="sidebar" style={styles.sidebar}>
                <h1 style={styles.sidebarTitle}>Admin Page</h1>
                <button style={styles.button} onClick={() => handleSectionChange('editHomePage')}>Home Page</button>
                <button style={styles.button} onClick={() => handleSectionChange('editInfoPage')}>Info Page</button>
                <button style={styles.button} onClick={() => handleSectionChange('createEventPage')}>Create Event</button>
                <button style={styles.button} onClick={() => handleSectionChange('createBlogPage')}>Create Blog</button>
                <button style={styles.button} onClick={() => handleSectionChange('editEventPage')}>Edit Event</button>
                <button style={styles.button} onClick={() => handleSectionChange('editBlogPage')}>Edit Blog</button>
                <button style={styles.button} onClick={() => handleSectionChange('userDataPage')}>User Data</button>
                <button style={styles.button} onClick={() => handleSectionChange('sendNewsPage')}>Send Newsletter</button>
            </div>

            <div className="container" style={styles.container}>
            {activeSection === 'editHomePage' && (
                    <div id="editHomePage">
                        <h2 style={styles.sectionTitle}>Edit Home</h2> 
                        <form onSubmit={handleHomePageSubmit}>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="headerTitle" style={styles.label}>Header Title</label>
                                <input
                                    type="text"
                                    value={headerTitle}
                                    onChange={(e) => setHeaderTitle(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="headerContent" style={styles.label}>Header Content</label>
                                <textarea
                                    value={headerContent}
                                    onChange={(e) => setHeaderContent(e.target.value)}
                                    style={styles.textarea}
                                ></textarea>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="secondTitle" style={styles.label}>Second Title</label>
                                <input
                                    type="text"
                                    value={secondTitle}
                                    onChange={(e) => setSecondTitle(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="secondContent" style={styles.label}>Second Content</label>
                                <textarea
                                    value={secondContent}
                                    onChange={(e) => setSecondContent(e.target.value)}
                                    style={styles.textarea}
                                ></textarea>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="videoUrl" style={styles.label}>Video URL</label>
                                <input
                                    type="text"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="image" style={styles.label}>Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    style={styles.inputFile}
                                />
                            </div>
                            <div>
                                <input type="submit" value="Update Home Page" style={styles.submitButton} />
                            </div>
                        </form>
                    </div>
                )}

                {activeSection === 'createBlogPage' && (
                    <div id="createBlogPage">
                        <h2 style={styles.sectionTitle}>Create Blog</h2>
                        <form onSubmit={handleBlogSubmit}>
                            <div className="form-group" style={styles.formGroup}>
                                <div className="form-row" style={styles.formRow}>
                                    <div className="form-item" style={styles.formItem}>
                                        <label htmlFor="blogTitle" style={styles.label}>Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-item" style={styles.formItem}>
                                        <label htmlFor="blogImage" style={styles.label}>Add Image</label>
                                        <input type="file" id="blogImage" name="blogImage" style={styles.inputFile} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <div className="form-row" style={styles.formRow}>
                                    <div className="form-item" style={styles.formItem}>
                                        <label htmlFor="blogDate" style={styles.label}>Blog Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            value={blogDateTime}
                                            onChange={(e) => setBlogDateTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogContent1" style={styles.label}>Content 1</label>
                                <textarea
                                    value={content1}
                                    onChange={(e) => setContent1(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogContent2" style={styles.label}>Content 2</label>
                                <textarea
                                    value={content2}
                                    onChange={(e) => setContent2(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <input type="submit" value="Add Blog Post" style={styles.submitButton} />
                            </div>
                        </form>
                    </div>
                )}

                {/* 나머지 섹션들도 비슷하게 추가 */}
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
    button: {
        width: '60%',
        backgroundColor: '#FFF502',
        color: 'black',
        fontWeight: 'bold',
        borderColor: 'black',
        borderRadius: '20px',
        padding: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '5px',
    },
    container: {
        marginLeft: '250px',
        padding: '20px',
        width: 'calc(100% - 250px)',
    },
    sectionTitle: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    formRow: {
        display: 'flex',
        alignItems: 'center',
    },
    formItem: {
        marginRight: '20px',
        flex: 1,
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '8px',
        marginTop: '5px',
        boxSizing: 'border-box',
        width: '100%',
    },
    inputFile: {
        marginTop: '5px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '8px',
        marginTop: '5px',
        boxSizing: 'border-box',
    },
    submitButton: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
        fontSize: 'large',
        fontWeight: 'bolder',
        padding: '12px 50px',
        textDecoration: 'none',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '10px',
        float: 'right',
    },
};

export default AdminPage;
