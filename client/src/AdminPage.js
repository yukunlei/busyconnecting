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
    const [image, setImage] = useState(null);

     // Info page state
     const [infoPage, setInfoPage] = useState('BusinessFundingPage'); // Dropdown 선택된 페이지
     const [infoTitle, setInfoTitle] = useState('');
     const [infoSubtitle, setInfoSubtitle] = useState('');
     const [infoContent, setInfoContent] = useState('');
     const [infoSubtitle2, setInfoSubtitle2] = useState('');
     const [infoContent2, setInfoContent2] = useState('');
     const [infoSubtitle3, setInfoSubtitle3] = useState('');
     const [infoContent3, setInfoContent3] = useState('');
     const [infoImage1, setInfoImage1] = useState(null);
     const [infoImage2, setInfoImage2] = useState(null);
     const [infoImage3, setInfoImage3] = useState(null);


    const [blogs, setBlogs] = useState([]); // State to store all blogs
    const [selectedBlogId, setSelectedBlogId] = useState(null); // State to store the selected blog ID for editing



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
                        setImage(data.image)
                    }
                })
                .catch(error => {
                    console.error('Error fetching home page data:', error);
                });
        }
    }, [activeSection]);

    useEffect(() => {
        if (activeSection === 'editInfoPage') {
            console.log("infoPage:", infoPage);
            fetch(`/api/infoPage/${infoPage}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setInfoTitle(data.title);
                        setInfoSubtitle(data.subtitle);
                        setInfoContent(data.content);
                        setInfoSubtitle2(data.subtitle2);
                        setInfoContent2(data.content2);
                        setInfoSubtitle3(data.subtitle3 || ''); // 해당 테이블에 subtitle3이 없을 경우 빈 문자열로 초기화
                        setInfoContent3(data.content3 || ''); // 해당 테이블에 content3이 없을 경우 빈 문자열로 초기화
                        setInfoImage1(data.image1);
                        setInfoImage2(data.image2);
                        setInfoImage3(data.image3 || null); // 해당 테이블에 image3이 없을 경우 null로 초기화
                    }
                })
                .catch(error => {
                    console.error('Error fetching info page data:', error);
                });
        }
    }, [activeSection, infoPage]); 
    useEffect(() => {
        if (activeSection === 'editBlogPage') {
            fetch('/api/blogPage/addNewBlog')
                .then(response => response.json())
                .then(data => setBlogs(data))
                .catch(error => console.error('Error fetching blogs:', error));
        }
    }, [activeSection]); 
    const handleBlogSubmit = (e) => {
        e.preventDefault();
    
        const blogData = new FormData(); // FormData 객체로 변경하여 파일 업로드 가능하게 함
        blogData.append('Title', title);
        blogData.append('BlogDateTime', blogDateTime);
        blogData.append('Content1', content1);
        blogData.append('Content2', content2);
    
        if (image) {
            blogData.append('Image', image);  // 이미지 파일을 FormData에 추가
        }
    
        fetch('/api/blogPage/addNewBlog', {
            method: 'POST',
            body: blogData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Blog post created with ID:', data.BlogId);
            setTitle('');
            setBlogDateTime('');
            setContent1('');
            setContent2('');
            setImage(null);  // 이미지 상태 초기화
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }; 
    // Blog image input handler
    const handleBlogImageChange = (e) => {
        setImage(e.target.files[0]);  // 파일 상태 업데이트
    };

    const handleHomePageSubmit = (e) => {
        e.preventDefault();
    
        const homePageData = new FormData();
        homePageData.append('HeaderTitle', headerTitle);
        homePageData.append('HeaderContent', headerContent);
        homePageData.append('Video', videoUrl);
        homePageData.append('SecondTitle', secondTitle);
        homePageData.append('SecondContent', secondContent);
        
        if (image) {
            homePageData.append('Image', image);  // 이미지 파일을 FormData에 추가
        }
    
        fetch('http://localhost:3001/api/homepage', {  // 절대 경로로 URL 수정
            method: 'PUT',
            body: homePageData,
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

    const handleInfoPageSubmit = (e) => {
        e.preventDefault();

        const infoPageData = new FormData();
        infoPageData.append('title', infoTitle);
        infoPageData.append('subtitle', infoSubtitle);
        infoPageData.append('content', infoContent);
        infoPageData.append('subtitle2', infoSubtitle2);
        infoPageData.append('content2', infoContent2);

        // 페이지에 따라 다른 subtitle3, content3, image3 필드를 추가
        if (infoPage === 'StrategicPage') {
            infoPageData.append('subtitle3', infoSubtitle3);
            infoPageData.append('content3', infoContent3);
        }

        if (infoImage1) {
            infoPageData.append('image1', infoImage1);
        }
        if (infoImage2) {
            infoPageData.append('image2', infoImage2);
        }
        if (infoImage3 && infoPage === 'StrategicPage') {
            infoPageData.append('image3', infoImage3);
        }

        fetch(`/api/infoPage/${infoPage}`, {
            method: 'PUT',
            body: infoPageData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Info page updated:', data.message);
            alert('정보 페이지가 성공적으로 업데이트되었습니다.');
        })
        .catch(error => {
            console.error('Error updating info page:', error);
            alert('정보 페이지 업데이트 중 오류가 발생했습니다.');
        });
    };







    // 클라이언트 코드 (React)
    const handleEditBlog = (id) => {
        console.log("clicked", id); // 클릭된 ID가 출력됨
        fetch(`http://localhost:3001/api/blogPage/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('response', response);
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // 서버에서 받아온 데이터 확인
                if (data) {
                    setTitle(data.Title);
                    setBlogDateTime(data.BlogDateTime);
                    setContent1(data.Content1);
                    setContent2(data.Content2);
                    setSelectedBlogId(id);
                }
            })
            .catch(error => console.error('Error fetching blog post:', error));
    };
    
    
    const handleUpdateBlog = (e) => {
        e.preventDefault();
        const blogData = new FormData();
        blogData.append('Title', title);
        blogData.append('BlogDateTime', blogDateTime);
        blogData.append('Content1', content1);
        blogData.append('Content2', content2);
    
        if (image) {
            blogData.append('Image', image);
        }
    
        fetch(`/api/blogPage/${selectedBlogId}`, {
            method: 'PUT',
            body: blogData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Blog post updated:', data.message);
            setSelectedBlogId(null);
            setTitle('');
            setBlogDateTime('');
            setContent1('');
            setContent2('');
            setImage(null);
            // Refresh blog list
            fetch('/api/blogPage/getAllBlog')
                .then(response => response.json())
                .then(data => setBlogs(data))
                .catch(error => console.error('Error fetching blogs:', error));
        })
        .catch(error => {
            console.error('Error updating blog post:', error);
        });
    };
    
    const handleDeleteBlog = (id) => {
        fetch(`/api/blogPage/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Blog post deleted:', data.message);
            // Refresh blog list
            setBlogs(blogs.filter(blog => blog.rowid !== id));
        })
        .catch(error => console.error('Error deleting blog post:', error));
    };
    
    return (
        <div style={{ display: 'flex' }}>
            <div className="sidebar" style={styles.sidebar}>
                <h1 style={styles.sidebarTitle}>Admin Page</h1>
                <button style={styles.button} onClick={() => handleSectionChange('editHomePage')}>Home Page</button>
                <button style={styles.button} onClick={() => handleSectionChange('editInfoPage')}>Info Page</button> 
                <button style={styles.button} onClick={() => handleSectionChange('createBlogPage')}>Create Blog</button> 
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
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBlogImageChange}
                                        style={styles.inputFile}
                                    />
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

            {activeSection === 'editInfoPage' && (
                <div id="editInfoPage">
                    <h2 style={styles.sectionTitle}>Edit Info</h2>
                    <form onSubmit={handleInfoPageSubmit}>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoPages" style={styles.label}>Select Page</label>
                            <select
                                id="infoPages"
                                name="infoPages"
                                value={infoPage}
                                onChange={(e) => setInfoPage(e.target.value)}
                                style={styles.select}
                            >
                                <option value="BusinessFundingPage">Business Funding Page</option>
                                <option value="StrategicPage">Strategic Digital Marketing Page</option>
                                <option value="TendersPage">Tenders Page</option>
                            </select>
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoTitle" style={styles.label}>Title</label>
                            <input
                                type="text"
                                value={infoTitle}
                                onChange={(e) => setInfoTitle(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoSubtitle" style={styles.label}>Subtitle</label>
                            <input
                                type="text"
                                value={infoSubtitle}
                                onChange={(e) => setInfoSubtitle(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoContent" style={styles.label}>Content</label>
                            <textarea
                                value={infoContent}
                                onChange={(e) => setInfoContent(e.target.value)}
                                style={styles.textarea}
                            ></textarea>
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoSubtitle2" style={styles.label}>Subtitle 2</label>
                            <input
                                type="text"
                                value={infoSubtitle2}
                                onChange={(e) => setInfoSubtitle2(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoContent2" style={styles.label}>Content 2</label>
                            <textarea
                                value={infoContent2}
                                onChange={(e) => setInfoContent2(e.target.value)}
                                style={styles.textarea}
                            ></textarea>
                        </div>

                        {/* StrategicPage일 경우에만 표시 */}
                        {infoPage === 'StrategicPage' && (
                            <>
                                <div className="form-group" style={styles.formGroup}>
                                    <label htmlFor="infoSubtitle3" style={styles.label}>Subtitle 3</label>
                                    <input
                                        type="text"
                                        value={infoSubtitle3}
                                        onChange={(e) => setInfoSubtitle3(e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div className="form-group" style={styles.formGroup}>
                                    <label htmlFor="infoContent3" style={styles.label}>Content 3</label>
                                    <textarea
                                        value={infoContent3}
                                        onChange={(e) => setInfoContent3(e.target.value)}
                                        style={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="form-group" style={styles.formGroup}>
                                    <label htmlFor="infoImage3" style={styles.label}>Add Image 3</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setInfoImage3(e.target.files[0])}
                                        style={styles.inputFile}
                                    />
                                </div>
                            </>
                        )}

                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoImage1" style={styles.label}>Add Image 1</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setInfoImage1(e.target.files[0])}
                                style={styles.inputFile}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="infoImage2" style={styles.label}>Add Image 2</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setInfoImage2(e.target.files[0])}
                                style={styles.inputFile}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Update Info Page" style={styles.submitButton} />
                        </div>
                    </form>
                </div>
            )}
            {activeSection === 'editBlogPage' && (
                <div id="editBlogPage">
                    <h2 style={styles.sectionTitle}>Edit Blog</h2>
                    <ul>
                    {blogs.map(blog => (
                        <li key={blog.BlogId}>
                            {blog.Title}
                            <button onClick={() => handleEditBlog(blog.BlogId)}>Edit</button>
                            <button onClick={() => handleDeleteBlog(blog.BlogId)}>Delete</button>
                        </li>
                    ))}
                    </ul>
                    {selectedBlogId && (
                        <form onSubmit={handleUpdateBlog}>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogTitle" style={styles.label}>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogDate" style={styles.label}>Blog Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={blogDateTime}
                                    onChange={(e) => setBlogDateTime(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogContent1" style={styles.label}>Content 1</label>
                                <textarea
                                    value={content1}
                                    onChange={(e) => setContent1(e.target.value)}
                                    style={styles.textarea}
                                ></textarea>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogContent2" style={styles.label}>Content 2</label>
                                <textarea
                                    value={content2}
                                    onChange={(e) => setContent2(e.target.value)}
                                    style={styles.textarea}
                                ></textarea>
                            </div>
                            <div className="form-group" style={styles.formGroup}>
                                <label htmlFor="blogImage" style={styles.label}>Update Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBlogImageChange}
                                    style={styles.inputFile}
                                />
                            </div>
                            <div>
                                <input type="submit" value="Update Blog Post" style={styles.submitButton} />
                            </div>
                        </form>
                    )}
                </div>
            )}

            
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
