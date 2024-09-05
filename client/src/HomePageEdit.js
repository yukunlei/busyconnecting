import React, { useEffect, useState } from 'react';

function HomePageEdit() {
    const [headerTitle, setHeaderTitle] = useState('');
    const [headerContent, setHeaderContent] = useState('');
    const [secondTitle, setSecondTitle] = useState('');
    const [secondContent, setSecondContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch('/api/homepage')
            .then(response => response.json())
            .then(data => {
                setHeaderTitle(data.HeaderTitle);
                setHeaderContent(data.HeaderContent);
                setSecondTitle(data.SecondTitle);
                setSecondContent(data.SecondContent);
                setVideoUrl(data.Video);
                setImage(data.image);
            })
            .catch(error => console.error('Error fetching home page data:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const homePageData = new FormData();
        homePageData.append('HeaderTitle', headerTitle);
        homePageData.append('HeaderContent', headerContent);
        homePageData.append('Video', videoUrl);
        homePageData.append('SecondTitle', secondTitle);
        homePageData.append('SecondContent', secondContent);

        if (image) {
            homePageData.append('Image', image);
        }

        fetch('http://localhost:3001/api/homepage', {
            method: 'PUT',
            body: homePageData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Home page updated:', data.message);
                alert('Your homepage information has been successfully updated.');
            })
            .catch(error => {
                console.error('Error updating home page:', error);
                alert('There was an error updating the homepage information.');
            });
    };

    return (
        <div id="editHomePage" style={styles.page}>
            <h2 style={styles.title}>Edit Home</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* 输入字段组，使用受控组件绑定 state */}
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="headerTitle" style={styles.label}>Header Title</label>
                    <input
                        type="text"
                        id="headerTitle"
                        value={headerTitle}
                        onChange={(e) => setHeaderTitle(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="headerContent" style={styles.label}>Header Content</label>
                    <textarea
                        id="headerContent"
                        value={headerContent}
                        onChange={(e) => setHeaderContent(e.target.value)}
                        style={styles.textarea}
                    ></textarea>
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="secondTitle" style={styles.label}>Second Title</label>
                    <input
                        type="text"
                        id="secondTitle"
                        value={secondTitle}
                        onChange={(e) => setSecondTitle(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="secondContent" style={styles.label}>Second Content</label>
                    <textarea
                        id="secondContent"
                        value={secondContent}
                        onChange={(e) => setSecondContent(e.target.value)}
                        style={styles.textarea}
                    ></textarea>
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="videoUrl" style={styles.label}>Video URL</label>
                    <input
                        type="text"
                        id="videoUrl"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="image" style={styles.label}>Image</label>
                    <input
                        type="file"
                        id="image"
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
    );
}

const styles = {
    page: {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%'
    },
    textarea: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        minHeight: '100px'
    },
    inputFile: {
        width: '100%',
        padding: '8px'
    },
    submitButton: {
        backgroundColor: '#0056b3',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default HomePageEdit;
