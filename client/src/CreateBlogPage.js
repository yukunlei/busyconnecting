import React, { useState } from 'react';

function CreateBlogPage() {
    const [title, setTitle] = useState('');
    const [blogDateTime, setBlogDateTime] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [image, setImage] = useState(null);

    const handleBlogSubmit = (e) => {
        e.preventDefault();
        const blogData = new FormData();
        blogData.append('Title', title);
        blogData.append('BlogDateTime', blogDateTime);
        blogData.append('Content1', content1);
        blogData.append('Content2', content2);
        if (image) {
            blogData.append('Image', image);
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
                setImage(null);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleBlogImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div style={styles.container}>
            <h2>Create Blog</h2>
            <form onSubmit={handleBlogSubmit}>
                <div style={styles.formGroup}>
                    <label>Title</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Blog Date & Time</label>
                    <input
                        type="datetime-local"
                        style={styles.input}
                        value={blogDateTime}
                        onChange={e => setBlogDateTime(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Content 1</label>
                    <textarea
                        style={styles.textarea}
                        value={content1}
                        onChange={e => setContent1(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Content 2</label>
                    <textarea
                        style={styles.textarea}
                        value={content2}
                        onChange={e => setContent2(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Image</label>
                    <input
                        type="file"
                        style={styles.inputFile}
                        accept="image/*"
                        onChange={handleBlogImageChange}
                    />
                </div>
                <button type="submit" style={styles.submitButton}>Add Blog Post</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    formGroup: {
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        width: '100%',
        minHeight: '100px',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    inputFile: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    }
};

export default CreateBlogPage;
