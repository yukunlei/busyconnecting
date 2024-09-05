import React, { useState, useEffect } from 'react';

function EditBlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [title, setTitle] = useState('');
    const [blogDateTime, setBlogDateTime] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = () => {
        fetch('/api/blogPage/getAllBlog')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    };

    const handleEditBlog = (id) => {
        fetch(`http://localhost:3001/api/blogPage/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setTitle(data.Title);
                setBlogDateTime(data.BlogDateTime);
                setContent1(data.Content1);
                setContent2(data.Content2);
                setSelectedBlogId(id);
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
                resetForm();
                fetchBlogs();
            })
            .catch(error => console.error('Error updating blog post:', error));
    };

    const handleDeleteBlog = (id) => {
        fetch(`/api/blogPage/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Blog post deleted:', data.message);
                setBlogs(blogs.filter(blog => blog.BlogId !== id));
            })
            .catch(error => console.error('Error deleting blog post:', error));
    };

    const resetForm = () => {
        setSelectedBlogId(null);
        setTitle('');
        setBlogDateTime('');
        setContent1('');
        setContent2('');
        setImage(null);
    };

    return (
        <div style={styles.container}>
            <h2>Edit Blog</h2>
            <ul style={styles.list}>
                {blogs.map(blog => (
                    <li key={blog.BlogId} style={styles.listItem}>
                        {blog.Title}
                        <div>
                            <button style={styles.button} onClick={() => handleEditBlog(blog.BlogId)}>Edit</button>
                            <button style={styles.button} onClick={() => handleDeleteBlog(blog.BlogId)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedBlogId && (
                <form onSubmit={handleUpdateBlog} style={styles.form}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
                    <input type="datetime-local" value={blogDateTime} onChange={(e) => setBlogDateTime(e.target.value)} style={styles.input} />
                    <textarea value={content1} onChange={(e) => setContent1(e.target.value)} style={styles.textarea} />
                    <textarea value={content2} onChange={(e) => setContent2(e.target.value)} style={styles.textarea} />
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={styles.input} />
                    <button type="submit" style={styles.submitButton}>Update Blog Post</button>
                </form>
            )}
        </div>
    );
}
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    form: {
        marginTop: '20px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
    },
    input: {
        padding: '10px',
        margin: '5px 0',
        width: '100%',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        margin: '5px 0',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        margin: '10px 5px',
        cursor: 'pointer',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        borderColor: 'transparent',
        display: 'block',
        width: '100%',
    }
};
export default EditBlogPage;
